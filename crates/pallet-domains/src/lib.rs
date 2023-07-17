// Copyright (C) 2021 Subspace Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// 	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//! Pallet Domains

#![cfg_attr(not(feature = "std"), no_std)]
#![feature(array_windows)]

#[cfg(feature = "runtime-benchmarks")]
mod benchmarking;

#[cfg(test)]
mod tests;

pub mod domain_registry;
pub mod runtime_registry;
mod staking;
pub mod weights;

use frame_support::traits::fungible::{Inspect, InspectFreeze};
use frame_support::traits::Get;
use frame_system::offchain::SubmitTransaction;
pub use pallet::*;
use sp_core::H256;
use sp_domains::bundle_producer_election::{is_below_threshold, BundleProducerElectionParams};
use sp_domains::fraud_proof::FraudProof;
use sp_domains::{
    DomainId, DomainInstanceData, OpaqueBundle, OperatorId, OperatorPublicKey, RuntimeId,
};
use sp_runtime::traits::{BlockNumberProvider, CheckedSub, One, Zero};
use sp_runtime::transaction_validity::TransactionValidityError;
use sp_runtime::{RuntimeAppPublic, SaturatedConversion};
use sp_std::vec::Vec;
use subspace_core_primitives::U256;

pub(crate) type BalanceOf<T> =
    <<T as Config>::Currency as Inspect<<T as frame_system::Config>::AccountId>>::Balance;

pub(crate) type FungibleFreezeId<T> =
    <<T as Config>::Currency as InspectFreeze<<T as frame_system::Config>::AccountId>>::Id;

pub(crate) type NominatorId<T> = <T as frame_system::Config>::AccountId;

pub trait FreezeIdentifier<T: Config> {
    fn staking_freeze_id(operator_id: OperatorId) -> FungibleFreezeId<T>;
    fn domain_instantiation_id(domain_id: DomainId) -> FungibleFreezeId<T>;
}

#[frame_support::pallet]
mod pallet {
    // TODO: a complaint on `submit_bundle` call, revisit once new v2 features are complete.
    #![allow(clippy::large_enum_variant)]

    use crate::domain_registry::{
        do_instantiate_domain, DomainConfig, DomainObject, Error as DomainRegistryError,
    };
    use crate::runtime_registry::{
        do_register_runtime, do_schedule_runtime_upgrade, do_upgrade_runtimes,
        register_runtime_at_genesis, Error as RuntimeRegistryError, RuntimeObject,
        ScheduledRuntimeUpgrade,
    };
    use crate::staking::{
        do_deregister_operator, do_nominate_operator, do_register_operator,
        do_switch_operator_domain, do_withdraw_stake, Error as StakingError, Nominator, Operator,
        OperatorConfig, StakingSummary, Withdraw,
    };
    use crate::weights::WeightInfo;
    use crate::{calculate_tx_range, BalanceOf, FreezeIdentifier, NominatorId};
    use codec::FullCodec;
    use frame_support::pallet_prelude::{StorageMap, *};
    use frame_support::traits::fungible::{InspectFreeze, MutateFreeze};
    use frame_support::weights::Weight;
    use frame_support::{Identity, PalletError};
    use frame_system::pallet_prelude::*;
    use sp_core::H256;
    use sp_domains::fraud_proof::FraudProof;
    use sp_domains::transaction::InvalidTransactionCode;
    use sp_domains::{DomainId, GenesisDomain, OpaqueBundle, OperatorId, RuntimeId, RuntimeType};
    use sp_runtime::traits::{
        AtLeast32BitUnsigned, BlockNumberProvider, Bounded, CheckEqual, MaybeDisplay, SimpleBitOps,
        Zero,
    };
    use sp_runtime::SaturatedConversion;
    use sp_std::fmt::Debug;
    use sp_std::vec;
    use sp_std::vec::Vec;
    use subspace_core_primitives::U256;

    #[pallet::config]
    pub trait Config: frame_system::Config {
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;

        /// Domain block number type.
        type DomainNumber: Parameter
            + Member
            + MaybeSerializeDeserialize
            + Debug
            + MaybeDisplay
            + AtLeast32BitUnsigned
            + Default
            + Bounded
            + Copy
            + sp_std::hash::Hash
            + sp_std::str::FromStr
            + MaxEncodedLen
            + TypeInfo;

        /// Domain block hash type.
        type DomainHash: Parameter
            + Member
            + MaybeSerializeDeserialize
            + Debug
            + MaybeDisplay
            + SimpleBitOps
            + Ord
            + Default
            + Copy
            + CheckEqual
            + sp_std::hash::Hash
            + AsRef<[u8]>
            + AsMut<[u8]>
            + MaxEncodedLen
            + Into<H256>;

        /// Same with `pallet_subspace::Config::ConfirmationDepthK`.
        type ConfirmationDepthK: Get<Self::BlockNumber>;

        /// Delay before a domain runtime is upgraded.
        type DomainRuntimeUpgradeDelay: Get<Self::BlockNumber>;

        /// Currency type used by the domains for staking and other currency related stuff.
        type Currency: MutateFreeze<Self::AccountId> + InspectFreeze<Self::AccountId>;

        /// Type representing the shares in the staking protocol.
        type Share: Parameter
            + Member
            + MaybeSerializeDeserialize
            + Debug
            + AtLeast32BitUnsigned
            + FullCodec
            + Copy
            + Default
            + TypeInfo
            + MaxEncodedLen
            + IsType<BalanceOf<Self>>;

        /// Identifier used for Freezing the funds used for staking.
        type FreezeIdentifier: FreezeIdentifier<Self>;

        /// The maximum block size limit for all domain.
        #[pallet::constant]
        type MaxDomainBlockSize: Get<u32>;

        /// The maximum block weight limit for all domain.
        #[pallet::constant]
        type MaxDomainBlockWeight: Get<Weight>;

        /// The maximum bundle per block limit for all domain.
        #[pallet::constant]
        type MaxBundlesPerBlock: Get<u32>;

        /// The maximum domain name length limit for all domain.
        #[pallet::constant]
        type MaxDomainNameLength: Get<u32>;

        /// The amount of fund to be locked up for the domain instance creator.
        #[pallet::constant]
        type DomainInstantiationDeposit: Get<BalanceOf<Self>>;

        /// Weight information for extrinsics in this pallet.
        type WeightInfo: WeightInfo;

        /// Initial domain tx range value.
        type InitialDomainTxRange: Get<u64>;

        /// Domain tx range is adjusted after every DomainTxRangeAdjustmentInterval blocks.
        type DomainTxRangeAdjustmentInterval: Get<u64>;

        /// Expected bundles to be produced per adjustment interval.
        type ExpectedBundlesPerInterval: Get<u64>;

        /// Minimum operator stake required to become operator of a domain.
        type MinOperatorStake: Get<BalanceOf<Self>>;
    }

    #[pallet::pallet]
    #[pallet::without_storage_info]
    pub struct Pallet<T>(_);

    /// Bundles submitted successfully in current block.
    #[pallet::storage]
    pub(super) type SuccessfulBundles<T> = StorageValue<_, Vec<H256>, ValueQuery>;

    /// Stores the next runtime id.
    #[pallet::storage]
    pub(super) type NextRuntimeId<T> = StorageValue<_, RuntimeId, ValueQuery>;

    #[pallet::storage]
    pub(super) type RuntimeRegistry<T: Config> =
        StorageMap<_, Identity, RuntimeId, RuntimeObject<T::BlockNumber, T::Hash>, OptionQuery>;

    #[pallet::storage]
    pub(super) type ScheduledRuntimeUpgrades<T: Config> = StorageDoubleMap<
        _,
        Identity,
        T::BlockNumber,
        Identity,
        RuntimeId,
        ScheduledRuntimeUpgrade,
        OptionQuery,
    >;

    #[pallet::storage]
    pub(super) type NextOperatorId<T> = StorageValue<_, OperatorId, ValueQuery>;

    #[pallet::storage]
    pub(super) type OperatorIdOwner<T: Config> =
        StorageMap<_, Identity, OperatorId, T::AccountId, OptionQuery>;

    #[pallet::storage]
    pub(super) type DomainStakingSummary<T: Config> =
        StorageMap<_, Identity, DomainId, StakingSummary<OperatorId, BalanceOf<T>>, OptionQuery>;

    #[pallet::storage]
    pub(super) type Operators<T: Config> =
        StorageMap<_, Identity, OperatorId, Operator<BalanceOf<T>, T::Share>, OptionQuery>;

    /// Temporary hold of all the operators who decided to switch to another domain.
    /// Once epoch is complete, these operators are added to new domains under next_operators.
    #[pallet::storage]
    pub(super) type PendingOperatorSwitches<T: Config> =
        StorageMap<_, Identity, DomainId, Vec<OperatorId>, OptionQuery>;

    #[pallet::storage]
    pub(super) type Nominators<T: Config> = StorageDoubleMap<
        _,
        Identity,
        OperatorId,
        Identity,
        NominatorId<T>,
        Nominator<T::Share>,
        OptionQuery,
    >;

    #[pallet::storage]
    pub(super) type PendingDeposits<T: Config> = StorageDoubleMap<
        _,
        Identity,
        OperatorId,
        Identity,
        NominatorId<T>,
        BalanceOf<T>,
        OptionQuery,
    >;

    #[pallet::storage]
    pub(super) type PendingWithdrawals<T: Config> = StorageDoubleMap<
        _,
        Identity,
        OperatorId,
        Identity,
        NominatorId<T>,
        Withdraw<BalanceOf<T>>,
        OptionQuery,
    >;

    /// Operators who chose to deregister from a domain.
    /// Stored here temporarily until domain epoch is complete.
    #[pallet::storage]
    pub(super) type PendingOperatorDeregistrations<T: Config> =
        StorageValue<_, Vec<OperatorId>, OptionQuery>;

    /// Stores the next domain id.
    #[pallet::storage]
    pub(super) type NextDomainId<T> = StorageValue<_, DomainId, ValueQuery>;

    /// The domain registry
    #[pallet::storage]
    pub(super) type DomainRegistry<T: Config> = StorageMap<
        _,
        Identity,
        DomainId,
        DomainObject<T::BlockNumber, T::Hash, T::AccountId>,
        OptionQuery,
    >;

    #[derive(TypeInfo, Encode, Decode, PalletError, Debug, PartialEq)]
    pub enum BundleError {
        /// Can not find the operator for given operator id.
        InvalidOperatorId,
        /// Invalid signature on the bundle header.
        BadBundleSignature,
        /// Invalid vrf signature in the proof of election.
        BadVrfSignature,
        /// Can not find the domain for given domain id.
        InvalidDomainId,
        /// Operator is not allowed to produce bundles in current epoch.
        BadOperator,
        /// Failed to pass the threshold check.
        ThresholdUnsatisfied,
        /// The Bundle is created too long ago.
        StaleBundle,
        /// An invalid execution receipt found in the bundle.
        Receipt(ExecutionReceiptError),
    }

    impl<T> From<BundleError> for Error<T> {
        #[inline]
        fn from(e: BundleError) -> Self {
            Self::Bundle(e)
        }
    }

    #[derive(TypeInfo, Encode, Decode, PalletError, Debug, PartialEq)]
    pub enum ExecutionReceiptError {
        /// The parent execution receipt is unknown.
        MissingParent,
        /// The execution receipt has been pruned.
        Pruned,
        /// The execution receipt points to a block unknown to the history.
        UnknownBlock,
        /// The execution receipt is too far in the future.
        TooFarInFuture,
        /// Receipts are not consecutive.
        Inconsecutive,
        /// Receipts in a bundle can not be empty.
        Empty,
    }

    impl<T> From<RuntimeRegistryError> for Error<T> {
        fn from(err: RuntimeRegistryError) -> Self {
            Error::RuntimeRegistry(err)
        }
    }

    impl<T> From<StakingError> for Error<T> {
        fn from(err: StakingError) -> Self {
            Error::Staking(err)
        }
    }

    impl<T> From<DomainRegistryError> for Error<T> {
        fn from(err: DomainRegistryError) -> Self {
            Error::DomainRegistry(err)
        }
    }

    #[pallet::error]
    pub enum Error<T> {
        /// Invalid bundle.
        Bundle(BundleError),
        /// Invalid fraud proof.
        FraudProof,
        /// Runtime registry specific errors
        RuntimeRegistry(RuntimeRegistryError),
        /// Staking related errors.
        Staking(StakingError),
        /// Domain registry specific errors
        DomainRegistry(DomainRegistryError),
    }

    #[pallet::event]
    #[pallet::generate_deposit(pub (super) fn deposit_event)]
    pub enum Event<T: Config> {
        /// A domain bundle was included.
        BundleStored {
            domain_id: DomainId,
            bundle_hash: H256,
            bundle_author: OperatorId,
        },
        DomainRuntimeCreated {
            runtime_id: RuntimeId,
            runtime_type: RuntimeType,
        },
        DomainRuntimeUpgradeScheduled {
            runtime_id: RuntimeId,
            scheduled_at: T::BlockNumber,
        },
        DomainRuntimeUpgraded {
            runtime_id: RuntimeId,
        },
        OperatorRegistered {
            operator_id: OperatorId,
            domain_id: DomainId,
        },
        OperatorNominated {
            operator_id: OperatorId,
            nominator_id: NominatorId<T>,
        },
        DomainInstantiated {
            domain_id: DomainId,
        },
        OperatorSwitchedDomain {
            old_domain_id: DomainId,
            new_domain_id: DomainId,
        },
        OperatorDeregistered {
            operator_id: OperatorId,
        },
        WithdrewStake {
            operator_id: OperatorId,
            nominator_id: NominatorId<T>,
        },
    }

    /// Per-domain state for tx range calculation.
    #[derive(Debug, Default, Decode, Encode, TypeInfo, PartialEq, Eq)]
    pub struct TxRangeState {
        /// Current tx range.
        pub tx_range: U256,

        /// Blocks in the current adjustment interval.
        pub interval_blocks: u64,

        /// Bundles in the current adjustment interval.
        pub interval_bundles: u64,
    }

    impl TxRangeState {
        /// Called when a bundle is added to the current block.
        pub fn on_bundle(&mut self) {
            self.interval_bundles += 1;
        }

        /// Called when the current block is finalized.
        pub fn on_finalize(
            &mut self,
            tx_range_adjustment_interval: u64,
            expected_bundle_count: u64,
        ) {
            self.interval_blocks += 1;
            if self.interval_blocks < tx_range_adjustment_interval {
                return;
            }

            // End of interval. Recalculate the tx range and reset the state.
            let prev_tx_range = self.tx_range;
            self.tx_range =
                calculate_tx_range(self.tx_range, self.interval_bundles, expected_bundle_count);
            log::trace!(target: "runtime::domains",
                "tx range update: blocks = {}, bundles = {}, prev = {prev_tx_range}, new = {}",
                self.interval_blocks, self.interval_bundles, self.tx_range);
            self.interval_blocks = 0;
            self.interval_bundles = 0;
        }
    }

    #[pallet::storage]
    pub(super) type DomainTxRangeState<T: Config> =
        StorageMap<_, Identity, DomainId, TxRangeState, OptionQuery>;

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        // TODO: proper weight
        #[allow(deprecated)]
        #[pallet::call_index(0)]
        #[pallet::weight(Weight::from_all(10_000))]
        pub fn submit_bundle(
            origin: OriginFor<T>,
            opaque_bundle: OpaqueBundle<T::BlockNumber, T::Hash, T::DomainNumber, T::DomainHash>,
        ) -> DispatchResult {
            ensure_none(origin)?;

            log::trace!(target: "runtime::domains", "Processing bundle: {opaque_bundle:?}");

            let domain_id = opaque_bundle.domain_id();

            // TODO: Implement the block tree v2.

            let bundle_hash = opaque_bundle.hash();

            SuccessfulBundles::<T>::append(bundle_hash);

            Self::note_domain_bundle(domain_id);

            Self::deposit_event(Event::BundleStored {
                domain_id,
                bundle_hash,
                bundle_author: opaque_bundle.operator_id(),
            });

            Ok(())
        }

        #[pallet::call_index(1)]
        #[pallet::weight(
            match fraud_proof {
                FraudProof::InvalidStateTransition(..) => (
                    T::WeightInfo::submit_system_domain_invalid_state_transition_proof(),
                    Pays::No
                ),
                // TODO: proper weight
                _ => (Weight::from_all(10_000), Pays::No),
            }
        )]
        pub fn submit_fraud_proof(
            origin: OriginFor<T>,
            fraud_proof: FraudProof<T::BlockNumber, T::Hash>,
        ) -> DispatchResult {
            ensure_none(origin)?;

            log::trace!(target: "runtime::domains", "Processing fraud proof: {fraud_proof:?}");

            // TODO: Implement fraud proof processing.

            Ok(())
        }

        #[pallet::call_index(2)]
        #[pallet::weight((Weight::from_all(10_000), Pays::Yes))]
        // TODO: proper benchmark
        pub fn register_domain_runtime(
            origin: OriginFor<T>,
            runtime_name: Vec<u8>,
            runtime_type: RuntimeType,
            code: Vec<u8>,
        ) -> DispatchResult {
            ensure_root(origin)?;

            let block_number = frame_system::Pallet::<T>::current_block_number();
            let runtime_id =
                do_register_runtime::<T>(runtime_name, runtime_type.clone(), code, block_number)
                    .map_err(Error::<T>::from)?;

            Self::deposit_event(Event::DomainRuntimeCreated {
                runtime_id,
                runtime_type,
            });

            Ok(())
        }

        #[pallet::call_index(3)]
        #[pallet::weight((Weight::from_all(10_000), Pays::Yes))]
        // TODO: proper benchmark
        pub fn upgrade_domain_runtime(
            origin: OriginFor<T>,
            runtime_id: RuntimeId,
            code: Vec<u8>,
        ) -> DispatchResult {
            ensure_root(origin)?;

            let block_number = frame_system::Pallet::<T>::current_block_number();
            let scheduled_at = do_schedule_runtime_upgrade::<T>(runtime_id, code, block_number)
                .map_err(Error::<T>::from)?;

            Self::deposit_event(Event::DomainRuntimeUpgradeScheduled {
                runtime_id,
                scheduled_at,
            });

            Ok(())
        }

        #[pallet::call_index(4)]
        #[pallet::weight((Weight::from_all(10_000), Pays::Yes))]
        // TODO: proper benchmark
        pub fn register_operator(
            origin: OriginFor<T>,
            domain_id: DomainId,
            amount: BalanceOf<T>,
            config: OperatorConfig<BalanceOf<T>>,
        ) -> DispatchResult {
            let owner = ensure_signed(origin)?;

            let operator_id = do_register_operator::<T>(owner, domain_id, amount, config)
                .map_err(Error::<T>::from)?;
            Self::deposit_event(Event::OperatorRegistered {
                operator_id,
                domain_id,
            });

            Ok(())
        }

        #[pallet::call_index(5)]
        #[pallet::weight((Weight::from_all(10_000), Pays::Yes))]
        // TODO: proper benchmark
        pub fn nominate_operator(
            origin: OriginFor<T>,
            operator_id: OperatorId,
            amount: BalanceOf<T>,
        ) -> DispatchResult {
            let nominator_id = ensure_signed(origin)?;

            do_nominate_operator::<T>(operator_id, nominator_id.clone(), amount)
                .map_err(Error::<T>::from)?;

            Self::deposit_event(Event::OperatorNominated {
                operator_id,
                nominator_id,
            });

            Ok(())
        }

        #[pallet::call_index(6)]
        #[pallet::weight((Weight::from_all(10_000), Pays::Yes))]
        // TODO: proper benchmark
        pub fn instantiate_domain(
            origin: OriginFor<T>,
            domain_config: DomainConfig,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            let created_at = frame_system::Pallet::<T>::current_block_number();

            let domain_id = do_instantiate_domain::<T>(domain_config, who, created_at)
                .map_err(Error::<T>::from)?;

            Self::deposit_event(Event::DomainInstantiated { domain_id });

            Ok(())
        }

        #[pallet::call_index(7)]
        #[pallet::weight((Weight::from_all(10_000), Pays::Yes))]
        // TODO: proper benchmark
        pub fn switch_domain(
            origin: OriginFor<T>,
            operator_id: OperatorId,
            new_domain_id: DomainId,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;

            let old_domain_id = do_switch_operator_domain::<T>(who, operator_id, new_domain_id)
                .map_err(Error::<T>::from)?;

            Self::deposit_event(Event::OperatorSwitchedDomain {
                old_domain_id,
                new_domain_id,
            });

            Ok(())
        }

        #[pallet::call_index(8)]
        #[pallet::weight((Weight::from_all(10_000), Pays::Yes))]
        // TODO: proper benchmark
        pub fn deregister_operator(
            origin: OriginFor<T>,
            operator_id: OperatorId,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;

            do_deregister_operator::<T>(who, operator_id).map_err(Error::<T>::from)?;

            Self::deposit_event(Event::OperatorDeregistered { operator_id });

            Ok(())
        }

        #[pallet::call_index(9)]
        #[pallet::weight((Weight::from_all(10_000), Pays::Yes))]
        // TODO: proper benchmark
        pub fn withdraw_stake(
            origin: OriginFor<T>,
            operator_id: OperatorId,
            withdraw: Withdraw<BalanceOf<T>>,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;

            do_withdraw_stake::<T>(operator_id, who.clone(), withdraw).map_err(Error::<T>::from)?;

            Self::deposit_event(Event::WithdrewStake {
                operator_id,
                nominator_id: who,
            });

            Ok(())
        }
    }

    #[pallet::genesis_config]
    pub struct GenesisConfig<T: Config> {
        pub genesis_domain: Option<GenesisDomain<T::AccountId>>,
    }

    impl<T: Config> Default for GenesisConfig<T> {
        fn default() -> Self {
            GenesisConfig {
                genesis_domain: None,
            }
        }
    }

    #[pallet::genesis_build]
    impl<T: Config> GenesisBuild<T> for GenesisConfig<T> {
        fn build(&self) {
            if let Some(genesis_domain) = &self.genesis_domain {
                // Register the genesis domain runtime
                let runtime_id = register_runtime_at_genesis::<T>(
                    genesis_domain.runtime_name.clone(),
                    genesis_domain.runtime_type.clone(),
                    genesis_domain.runtime_version.clone(),
                    genesis_domain.code.clone(),
                    Zero::zero(),
                )
                .expect("Genesis runtime registration must always succeed");

                // Instantiate the genesis domain
                let domain_config = DomainConfig::from_genesis::<T>(genesis_domain, runtime_id);
                let domain_owner = genesis_domain.owner_account_id.clone();
                let domain_id =
                    do_instantiate_domain::<T>(domain_config, domain_owner.clone(), Zero::zero())
                        .expect("Genesis domain instantiation must always succeed");

                // Register domain_owner as the genesis operator.
                let operator_config = OperatorConfig {
                    signing_key: genesis_domain.signing_key.clone(),
                    minimum_nominator_stake: genesis_domain
                        .minimum_nominator_stake
                        .saturated_into(),
                    nomination_tax: genesis_domain.nomination_tax,
                };
                let operator_stake = T::MinOperatorStake::get();
                let operator_id = do_register_operator::<T>(
                    domain_owner,
                    domain_id,
                    operator_stake,
                    operator_config,
                )
                .expect("Genesis operator registration must succeed");

                // TODO: Enact the epoch transition logic properly.
                Operators::<T>::mutate(operator_id, |maybe_operator| {
                    let operator = maybe_operator
                        .as_mut()
                        .expect("Genesis operator must exist");
                    operator.current_total_stake = operator_stake;
                });
                DomainStakingSummary::<T>::insert(
                    domain_id,
                    StakingSummary {
                        current_epoch_index: 0,
                        current_total_stake: operator_stake,
                        current_operators: vec![operator_id],
                        next_operators: vec![],
                    },
                );
            }
        }
    }

    #[pallet::hooks]
    // TODO: proper benchmark
    impl<T: Config> Hooks<T::BlockNumber> for Pallet<T> {
        fn on_initialize(block_number: T::BlockNumber) -> Weight {
            SuccessfulBundles::<T>::kill();

            do_upgrade_runtimes::<T>(block_number);

            Weight::zero()
        }

        fn on_finalize(_: T::BlockNumber) {
            Self::update_domain_tx_range();
        }
    }

    /// Constructs a `TransactionValidity` with pallet-executor specific defaults.
    fn unsigned_validity(prefix: &'static str, tag: impl Encode) -> TransactionValidity {
        ValidTransaction::with_tag_prefix(prefix)
            .priority(TransactionPriority::MAX)
            .and_provides(tag)
            .longevity(TransactionLongevity::MAX)
            // We need this extrinsic to be propagated to the farmer nodes.
            .propagate(true)
            .build()
    }

    #[pallet::validate_unsigned]
    impl<T: Config> ValidateUnsigned for Pallet<T> {
        type Call = Call<T>;
        fn pre_dispatch(call: &Self::Call) -> Result<(), TransactionValidityError> {
            match call {
                Call::submit_bundle { opaque_bundle } => {
                    Self::pre_dispatch_submit_bundle(opaque_bundle)
                }
                Call::submit_fraud_proof { fraud_proof: _ } => Ok(()),
                _ => Err(InvalidTransaction::Call.into()),
            }
        }

        fn validate_unsigned(_source: TransactionSource, call: &Self::Call) -> TransactionValidity {
            match call {
                Call::submit_bundle { opaque_bundle } => {
                    if let Err(e) = Self::validate_bundle(opaque_bundle) {
                        log::debug!(
                            target: "runtime::domains",
                            "Bad bundle {:?}, error: {e:?}", opaque_bundle.domain_id(),
                        );
                        if let BundleError::Receipt(_) = e {
                            return InvalidTransactionCode::ExecutionReceipt.into();
                        } else {
                            return InvalidTransactionCode::Bundle.into();
                        }
                    }

                    ValidTransaction::with_tag_prefix("SubspaceSubmitBundle")
                        .priority(TransactionPriority::MAX)
                        .longevity(T::ConfirmationDepthK::get().try_into().unwrap_or_else(|_| {
                            panic!("Block number always fits in TransactionLongevity; qed")
                        }))
                        .and_provides(opaque_bundle.hash())
                        .propagate(true)
                        .build()
                }
                Call::submit_fraud_proof { fraud_proof } => {
                    // TODO: Validate fraud proof

                    // TODO: proper tag value.
                    unsigned_validity("SubspaceSubmitFraudProof", fraud_proof)
                }

                _ => InvalidTransaction::Call.into(),
            }
        }
    }
}

impl<T: Config> Pallet<T> {
    pub fn successful_bundles() -> Vec<H256> {
        SuccessfulBundles::<T>::get()
    }

    pub fn domain_runtime_code(domain_id: DomainId) -> Option<Vec<u8>> {
        RuntimeRegistry::<T>::get(Self::runtime_id(domain_id)?)
            .map(|runtime_object| runtime_object.code)
    }

    pub fn runtime_id(domain_id: DomainId) -> Option<RuntimeId> {
        DomainRegistry::<T>::get(domain_id)
            .map(|domain_object| domain_object.domain_config.runtime_id)
    }

    pub fn domain_instance_data(domain_id: DomainId) -> Option<DomainInstanceData> {
        let runtime_id = DomainRegistry::<T>::get(domain_id)?
            .domain_config
            .runtime_id;
        let (runtime_type, runtime_code) = RuntimeRegistry::<T>::get(runtime_id)
            .map(|runtime_object| (runtime_object.runtime_type, runtime_object.code))?;
        Some(DomainInstanceData {
            runtime_type,
            runtime_code,
        })
    }

    /// Returns the tx range for the domain.
    pub fn domain_tx_range(domain_id: DomainId) -> U256 {
        DomainTxRangeState::<T>::try_get(domain_id)
            .map(|state| state.tx_range)
            .ok()
            .unwrap_or_else(Self::initial_tx_range)
    }

    pub fn bundle_producer_election_params(
        domain_id: DomainId,
    ) -> Option<BundleProducerElectionParams<BalanceOf<T>>> {
        match (
            DomainRegistry::<T>::get(domain_id),
            DomainStakingSummary::<T>::get(domain_id),
        ) {
            (Some(domain_object), Some(stake_summary)) => Some(BundleProducerElectionParams {
                current_operators: stake_summary.current_operators,
                total_domain_stake: stake_summary.current_total_stake,
                bundle_slot_probability: domain_object.domain_config.bundle_slot_probability,
            }),
            _ => None,
        }
    }

    pub fn operator(operator_id: OperatorId) -> Option<(OperatorPublicKey, BalanceOf<T>)> {
        Operators::<T>::get(operator_id)
            .map(|operator| (operator.signing_key, operator.current_total_stake))
    }

    fn pre_dispatch_submit_bundle(
        _opaque_bundle: &OpaqueBundle<T::BlockNumber, T::Hash, T::DomainNumber, T::DomainHash>,
    ) -> Result<(), TransactionValidityError> {
        // TODO: Validate domain block tree
        Ok(())
    }

    fn validate_bundle(
        OpaqueBundle {
            sealed_header,
            receipt: _,
            extrinsics: _,
        }: &OpaqueBundle<T::BlockNumber, T::Hash, T::DomainNumber, T::DomainHash>,
    ) -> Result<(), BundleError> {
        let operator_id = sealed_header.header.proof_of_election.operator_id;

        let operator = Operators::<T>::get(operator_id).ok_or(BundleError::InvalidOperatorId)?;

        if !operator
            .signing_key
            .verify(&sealed_header.pre_hash(), &sealed_header.signature)
        {
            return Err(BundleError::BadBundleSignature);
        }

        let header = &sealed_header.header;

        let current_block_number = frame_system::Pallet::<T>::current_block_number();

        // Reject the stale bundles so that they can't be used by attacker to occupy the block space without cost.
        let confirmation_depth_k = T::ConfirmationDepthK::get();
        if let Some(finalized) = current_block_number.checked_sub(&confirmation_depth_k) {
            {
                // Ideally, `bundle.header.primary_number` is `current_block_number - 1`, we need
                // to handle the edge case that `T::ConfirmationDepthK` happens to be 1.
                let is_stale_bundle = if confirmation_depth_k.is_zero() {
                    unreachable!(
                        "ConfirmationDepthK is guaranteed to be non-zero at genesis config"
                    )
                } else if confirmation_depth_k == One::one() {
                    header.consensus_block_number < finalized
                } else {
                    header.consensus_block_number <= finalized
                };

                if is_stale_bundle {
                    log::debug!(
                        target: "runtime::domains",
                        "Bundle created on an ancient consensus block, current_block_number: {current_block_number:?}, \
                        ConfirmationDepthK: {confirmation_depth_k:?}, `bundle.header.primary_number`: {:?}, `finalized`: {finalized:?}",
                        header.consensus_block_number,
                    );
                    return Err(BundleError::StaleBundle);
                }
            }
        }

        // TODO: Implement bundle validation.

        // TODO: The current staking distribution may be unusable when there is an epoch
        // transition, track the last stake distribution in that case.
        let proof_of_election = &sealed_header.header.proof_of_election;

        proof_of_election
            .verify_vrf_signature(&operator.signing_key)
            .map_err(|_| BundleError::BadVrfSignature)?;

        let domain_id = proof_of_election.domain_id;

        let domain_stake_summary =
            DomainStakingSummary::<T>::get(domain_id).ok_or(BundleError::InvalidDomainId)?;

        if !domain_stake_summary
            .current_operators
            .contains(&operator_id)
        {
            return Err(BundleError::BadOperator);
        }

        let bundle_slot_probability = DomainRegistry::<T>::get(domain_id)
            .ok_or(BundleError::InvalidDomainId)?
            .domain_config
            .bundle_slot_probability;

        let operator_stake = operator.current_total_stake;
        let total_domain_stake = domain_stake_summary.current_total_stake;

        let threshold = sp_domains::bundle_producer_election::calculate_threshold(
            operator_stake.saturated_into(),
            total_domain_stake.saturated_into(),
            bundle_slot_probability,
        );

        if !is_below_threshold(&proof_of_election.vrf_signature.output, threshold) {
            return Err(BundleError::ThresholdUnsatisfied);
        }

        Ok(())
    }

    /// Called when a bundle is added to update the bundle state for tx range
    /// calculation.
    fn note_domain_bundle(domain_id: DomainId) {
        DomainTxRangeState::<T>::mutate(domain_id, |maybe_state| match maybe_state {
            Some(state) => {
                state.interval_bundles += 1;
            }
            None => {
                maybe_state.replace(TxRangeState {
                    tx_range: Self::initial_tx_range(),
                    interval_blocks: 0,
                    interval_bundles: 1,
                });
            }
        });
    }

    /// Called when the block is finalized to update the tx range for all the
    /// domains with bundles in the block.
    fn update_domain_tx_range() {
        for domain_id in DomainTxRangeState::<T>::iter_keys() {
            DomainTxRangeState::<T>::mutate(domain_id, |maybe_state| {
                if let Some(state) = maybe_state {
                    state.on_finalize(
                        T::DomainTxRangeAdjustmentInterval::get(),
                        T::ExpectedBundlesPerInterval::get(),
                    );
                }
            })
        }
    }

    /// Calculates the initial tx range.
    fn initial_tx_range() -> U256 {
        U256::MAX / T::InitialDomainTxRange::get()
    }
}

impl<T> Pallet<T>
where
    T: Config + frame_system::offchain::SendTransactionTypes<Call<T>>,
{
    /// Submits an unsigned extrinsic [`Call::submit_bundle`].
    pub fn submit_bundle_unsigned(
        opaque_bundle: OpaqueBundle<T::BlockNumber, T::Hash, T::DomainNumber, T::DomainHash>,
    ) {
        let slot = opaque_bundle.sealed_header.slot_number();
        let extrincis_count = opaque_bundle.extrinsics.len();

        let call = Call::submit_bundle { opaque_bundle };

        match SubmitTransaction::<T, Call<T>>::submit_unsigned_transaction(call.into()) {
            Ok(()) => {
                log::info!(
                    target: "runtime::domains",
                    "Submitted bundle from slot {slot}, extrinsics: {extrincis_count}",
                );
            }
            Err(()) => {
                log::error!(target: "runtime::domains", "Error submitting bundle");
            }
        }
    }

    /// Submits an unsigned extrinsic [`Call::submit_fraud_proof`].
    pub fn submit_fraud_proof_unsigned(fraud_proof: FraudProof<T::BlockNumber, T::Hash>) {
        let call = Call::submit_fraud_proof { fraud_proof };

        match SubmitTransaction::<T, Call<T>>::submit_unsigned_transaction(call.into()) {
            Ok(()) => {
                log::info!(target: "runtime::domains", "Submitted fraud proof");
            }
            Err(()) => {
                log::error!(target: "runtime::domains", "Error submitting fraud proof");
            }
        }
    }
}

/// Calculates the new tx range based on the bundles produced during the interval.
pub fn calculate_tx_range(
    cur_tx_range: U256,
    actual_bundle_count: u64,
    expected_bundle_count: u64,
) -> U256 {
    if actual_bundle_count == 0 || expected_bundle_count == 0 {
        return cur_tx_range;
    }

    let Some(new_tx_range) = U256::from(actual_bundle_count)
        .saturating_mul(&cur_tx_range)
        .checked_div(&U256::from(expected_bundle_count)) else {
        return cur_tx_range;
    };

    let upper_bound = cur_tx_range.saturating_mul(&U256::from(4_u64));
    let Some(lower_bound) = cur_tx_range.checked_div(&U256::from(4_u64)) else {
        return cur_tx_range;
    };
    new_tx_range.clamp(lower_bound, upper_bound)
}
