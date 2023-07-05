(function() {var implementors = {
"domain_client_consensus_relay_chain":[["impl&lt;Block, I&gt; BlockImport&lt;Block&gt; for &amp;<a class=\"struct\" href=\"domain_client_consensus_relay_chain/struct.DomainBlockImport.html\" title=\"struct domain_client_consensus_relay_chain::DomainBlockImport\">DomainBlockImport</a>&lt;I&gt;<span class=\"where fmt-newline\">where\n    Block: BlockT,\n    I: BlockImport&lt;Block&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a>,</span>"]],
"sc_consensus_fraud_proof":[["impl&lt;Block, Client, Inner, Verifier, DomainHash&gt; BlockImport&lt;Block&gt; for <a class=\"struct\" href=\"sc_consensus_fraud_proof/struct.FraudProofBlockImport.html\" title=\"struct sc_consensus_fraud_proof::FraudProofBlockImport\">FraudProofBlockImport</a>&lt;Block, Client, Inner, Verifier, DomainHash&gt;<span class=\"where fmt-newline\">where\n    Block: BlockT,\n    Client: ProvideRuntimeApi&lt;Block&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,\n    Client::Api: DomainsApi&lt;Block, DomainHash&gt;,\n    Inner: BlockImport&lt;Block, Transaction = TransactionFor&lt;Client, Block&gt;, Error = ConsensusError&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a>,\n    Verifier: VerifyFraudProof&lt;Block&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a>,\n    DomainHash: Encode + Decode + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a>,</span>"]],
"sc_consensus_subspace":[["impl&lt;PosTable, Block, Client, Inner, CIDP&gt; BlockImport&lt;Block&gt; for <a class=\"struct\" href=\"sc_consensus_subspace/struct.SubspaceBlockImport.html\" title=\"struct sc_consensus_subspace::SubspaceBlockImport\">SubspaceBlockImport</a>&lt;PosTable, Block, Client, Inner, CIDP&gt;<span class=\"where fmt-newline\">where\n    PosTable: <a class=\"trait\" href=\"subspace_proof_of_space/trait.Table.html\" title=\"trait subspace_proof_of_space::Table\">Table</a>,\n    Block: BlockT,\n    Inner: BlockImport&lt;Block, Transaction = TransactionFor&lt;Client, Block&gt;, Error = ConsensusError&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,\n    Inner::Error: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;ConsensusError&gt;,\n    Client: ProvideRuntimeApi&lt;Block&gt; + BlockBackend&lt;Block&gt; + HeaderBackend&lt;Block&gt; + AuxStore + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,\n    Client::Api: BlockBuilderApi&lt;Block&gt; + SubspaceApi&lt;Block, FarmerPublicKey&gt; + ApiExt&lt;Block&gt;,\n    CIDP: CreateInherentDataProviders&lt;Block, <a class=\"struct\" href=\"sc_consensus_subspace/struct.SubspaceLink.html\" title=\"struct sc_consensus_subspace::SubspaceLink\">SubspaceLink</a>&lt;Block&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,</span>"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()