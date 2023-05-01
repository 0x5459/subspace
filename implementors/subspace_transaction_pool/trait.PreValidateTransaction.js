(function() {var implementors = {
"domain_service":[["impl&lt;Block, SBlock, PBlock, Client, SClient&gt; <a class=\"trait\" href=\"subspace_transaction_pool/trait.PreValidateTransaction.html\" title=\"trait subspace_transaction_pool::PreValidateTransaction\">PreValidateTransaction</a> for <a class=\"struct\" href=\"domain_service/struct.CoreDomainTxPreValidator.html\" title=\"struct domain_service::CoreDomainTxPreValidator\">CoreDomainTxPreValidator</a>&lt;Block, SBlock, PBlock, Client, SClient&gt;<span class=\"where fmt-newline\">where\n    Block: BlockT,\n    SBlock: BlockT,\n    PBlock: BlockT,\n    SBlock::Hash: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;Block::Hash&gt;,\n    NumberFor&lt;SBlock&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;NumberFor&lt;Block&gt;&gt;,\n    Client: ProvideRuntimeApi&lt;Block&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,\n    Client::Api: <a class=\"trait\" href=\"sp_messenger/trait.MessengerApi.html\" title=\"trait sp_messenger::MessengerApi\">MessengerApi</a>&lt;Block, NumberFor&lt;Block&gt;&gt;,\n    SClient: HeaderBackend&lt;SBlock&gt; + ProvideRuntimeApi&lt;SBlock&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,\n    SClient::Api: <a class=\"trait\" href=\"sp_messenger/trait.MessengerApi.html\" title=\"trait sp_messenger::MessengerApi\">MessengerApi</a>&lt;SBlock, NumberFor&lt;SBlock&gt;&gt; + <a class=\"trait\" href=\"system_runtime_primitives/trait.SystemDomainApi.html\" title=\"trait system_runtime_primitives::SystemDomainApi\">SystemDomainApi</a>&lt;SBlock, NumberFor&lt;PBlock&gt;, PBlock::Hash&gt;,</span>"]],
"subspace_service":[["impl&lt;Block, Client, Verifier, BundleValidator&gt; PreValidateTransaction for <a class=\"struct\" href=\"subspace_service/tx_pre_validator/struct.PrimaryChainTxPreValidator.html\" title=\"struct subspace_service::tx_pre_validator::PrimaryChainTxPreValidator\">PrimaryChainTxPreValidator</a>&lt;Block, Client, Verifier, BundleValidator&gt;<span class=\"where fmt-newline\">where\n    Block: BlockT,\n    Client: ProvideRuntimeApi&lt;Block&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,\n    Client::Api: <a class=\"trait\" href=\"sp_domains/transaction/trait.PreValidationObjectApi.html\" title=\"trait sp_domains::transaction::PreValidationObjectApi\">PreValidationObjectApi</a>&lt;Block, <a class=\"type\" href=\"domain_runtime_primitives/type.Hash.html\" title=\"type domain_runtime_primitives::Hash\">Hash</a>&gt;,\n    Verifier: <a class=\"trait\" href=\"subspace_fraud_proof/trait.VerifyFraudProof.html\" title=\"trait subspace_fraud_proof::VerifyFraudProof\">VerifyFraudProof</a>&lt;Block&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,\n    BundleValidator: ValidateBundle&lt;Block, <a class=\"type\" href=\"domain_runtime_primitives/type.Hash.html\" title=\"type domain_runtime_primitives::Hash\">Hash</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,</span>"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()