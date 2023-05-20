//! Service and ServiceFactory implementation. Specialized wrapper over substrate service.

mod core_domain;
mod core_domain_tx_pre_validator;
pub mod providers;
pub mod rpc;
mod system_domain;
mod system_domain_tx_pre_validator;

pub use self::core_domain::{new_full_core, CoreDomainExecutor, CoreDomainParams, NewFullCore};
pub use self::core_domain_tx_pre_validator::CoreDomainTxPreValidator;
pub use self::system_domain::{new_full_system, FullPool, NewFullSystem};
use domain_bundles::{build_bundle_pool, BundleDownloader, BundleServer, CompactBundlePool};
use futures::channel::mpsc;
use sc_executor::NativeElseWasmExecutor;
use sc_service::config::RequestResponseConfig;
use sc_service::{Configuration as ServiceConfiguration, TFullClient};
use sc_subspace_block_relay::{build_execution_relay, NetworkWrapper};
use sc_transaction_pool_api::TransactionPool;
use sp_runtime::traits::Block as BlockT;
use std::sync::Arc;
use std::time::Duration;

/// Domain full client.
pub type FullClient<Block, RuntimeApi, ExecutorDispatch> =
    TFullClient<Block, RuntimeApi, NativeElseWasmExecutor<ExecutorDispatch>>;

pub type FullBackend<Block> = sc_service::TFullBackend<Block>;

/// Domain configuration.
#[derive(Debug)]
pub struct DomainConfiguration<AccountId> {
    pub service_config: ServiceConfiguration,
    pub maybe_relayer_id: Option<AccountId>,
    pub enable_bundle_relay: bool,
}

/// The components for bundle relay
pub struct BundleRelayComponents<Block, PBlock, Pool>
where
    Block: BlockT,
    PBlock: BlockT,
    Pool: TransactionPool<Block = Block>,
{
    /// Transaction pool
    pub transaction_pool: Arc<Pool>,

    /// Compact bundle pool
    pub bundle_pool: Arc<dyn CompactBundlePool<Block, PBlock, Pool>>,

    /// Bundle download client
    pub download_client: Arc<dyn BundleDownloader<Block, PBlock, Pool>>,

    /// Bundle server
    pub download_server: Box<dyn BundleServer>,

    /// Network wrapper for the client
    pub network_wrapper: Arc<NetworkWrapper>,

    /// Request/response protocol for network config
    pub request_response_protocol: RequestResponseConfig,
}

impl<Block, PBlock, Pool> BundleRelayComponents<Block, PBlock, Pool>
where
    Block: BlockT + 'static,
    PBlock: BlockT + 'static,
    Pool: TransactionPool<Block = Block> + 'static,
{
    pub fn new(
        protocol_name: String,
        incoming_queue_size: usize,
        transaction_pool: Arc<Pool>,
    ) -> Self {
        let (request_sender, request_receiver) = mpsc::channel(incoming_queue_size);
        let request_response_protocol = RequestResponseConfig {
            name: protocol_name.into(),
            fallback_names: Vec::new(),
            max_request_size: 1024 * 1024,
            max_response_size: 16 * 1024 * 1024,
            request_timeout: Duration::from_secs(20),
            inbound_queue: Some(request_sender),
        };

        let bundle_pool = build_bundle_pool(transaction_pool.clone());
        let network_wrapper = Arc::new(NetworkWrapper::default());
        let (download_client, download_server) = build_execution_relay(
            network_wrapper.clone(),
            request_response_protocol.name.clone(),
            request_receiver,
            transaction_pool.clone(),
            bundle_pool.clone(),
        );

        Self {
            transaction_pool,
            bundle_pool,
            download_client,
            download_server,
            network_wrapper,
            request_response_protocol,
        }
    }
}
