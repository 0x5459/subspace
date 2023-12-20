(function() {var implementors = {
"sc_consensus_subspace":[["impl&lt;PosTable, Block, Client, Inner, CIDP, AS&gt; BlockImport&lt;Block&gt; for <a class=\"struct\" href=\"sc_consensus_subspace/block_import/struct.SubspaceBlockImport.html\" title=\"struct sc_consensus_subspace::block_import::SubspaceBlockImport\">SubspaceBlockImport</a>&lt;PosTable, Block, Client, Inner, CIDP, AS&gt;<span class=\"where fmt-newline\">where\n    PosTable: <a class=\"trait\" href=\"subspace_proof_of_space/trait.Table.html\" title=\"trait subspace_proof_of_space::Table\">Table</a>,\n    Block: BlockT,\n    Inner: BlockImport&lt;Block, Error = Error&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,\n    Client: ProvideRuntimeApi&lt;Block&gt; + BlockBackend&lt;Block&gt; + HeaderBackend&lt;Block&gt; + AuxStore + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,\n    Client::Api: BlockBuilderApi&lt;Block&gt; + SubspaceApi&lt;Block, FarmerPublicKey&gt; + ApiExt&lt;Block&gt;,\n    CIDP: CreateInherentDataProviders&lt;Block, <a class=\"struct\" href=\"sc_consensus_subspace/struct.SubspaceLink.html\" title=\"struct sc_consensus_subspace::SubspaceLink\">SubspaceLink</a>&lt;Block&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,\n    AS: AuxStore + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,\n    <a class=\"type\" href=\"subspace_core_primitives/type.BlockNumber.html\" title=\"type subspace_core_primitives::BlockNumber\">BlockNumber</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&lt;&lt;Block as BlockT&gt;::Header as HeaderT&gt;::Number&gt;,</span>"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()