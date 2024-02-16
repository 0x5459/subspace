(function() {var type_impls = {
"subspace_runtime":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Executive%3CSystem,+Block,+Context,+UnsignedValidator,+AllPalletsWithSystem,+COnRuntimeUpgrade%3E\" class=\"impl\"><a href=\"#impl-Executive%3CSystem,+Block,+Context,+UnsignedValidator,+AllPalletsWithSystem,+COnRuntimeUpgrade%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;System, Block, Context, UnsignedValidator, AllPalletsWithSystem, COnRuntimeUpgrade&gt; Executive&lt;System, Block, Context, UnsignedValidator, AllPalletsWithSystem, COnRuntimeUpgrade&gt;<div class=\"where\">where\n    System: Config + EnsureInherentsAreFirst&lt;Block&gt;,\n    Block: Block&lt;Header = &lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT, Hash = &lt;System as Config&gt;::Hash&gt;,\n    Context: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a>,\n    AllPalletsWithSystem: OnRuntimeUpgrade + BeforeAllRuntimeMigrations + OnInitialize&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; + OnIdle&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; + OnFinalize&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; + OffchainWorker&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt;,\n    COnRuntimeUpgrade: OnRuntimeUpgrade,\n    &lt;Block as Block&gt;::Extrinsic: Checkable&lt;Context&gt; + Codec,\n    &lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked: Applyable + GetDispatchInfo,\n    &lt;&lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked as Applyable&gt;::Call: Dispatchable&lt;Info = DispatchInfo, PostInfo = PostDispatchInfo&gt;,\n    &lt;&lt;&lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked as Applyable&gt;::Call as Dispatchable&gt;::RuntimeOrigin: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;System as Config&gt;::AccountId&gt;&gt;,\n    UnsignedValidator: ValidateUnsigned&lt;Call = &lt;&lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked as Applyable&gt;::Call&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.execute_on_runtime_upgrade\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">execute_on_runtime_upgrade</a>() -&gt; Weight</h4></section></summary><div class=\"docblock\"><p>Execute all <code>OnRuntimeUpgrade</code> of this runtime, and return the aggregate weight.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.initialize_block\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">initialize_block</a>(\n    header: &amp;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT\n)</h4></section></summary><div class=\"docblock\"><p>Start the execution of a particular block.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.execute_block\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">execute_block</a>(block: Block)</h4></section></summary><div class=\"docblock\"><p>Actually execute all transitions for <code>block</code>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.finalize_block\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">finalize_block</a>(\n) -&gt; &lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT</h4></section></summary><div class=\"docblock\"><p>Finalize the block - it is up the caller to ensure that all header fields are valid\nexcept state-root.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.apply_extrinsic\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">apply_extrinsic</a>(\n    uxt: &lt;Block as Block&gt;::Extrinsic\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>, DispatchError&gt;, TransactionValidityError&gt;</h4></section></summary><div class=\"docblock\"><p>Apply extrinsic outside of the block execution function.</p>\n<p>This doesn’t attempt to validate anything regarding the block, but it builds a list of uxt\nhashes.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.validate_transaction\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">validate_transaction</a>(\n    source: TransactionSource,\n    uxt: &lt;Block as Block&gt;::Extrinsic,\n    block_hash: &lt;Block as Block&gt;::Hash\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;ValidTransaction, TransactionValidityError&gt;</h4></section></summary><div class=\"docblock\"><p>Check a given signed transaction for validity. This doesn’t execute any\nside-effects; it merely checks whether the transaction would panic if it were included or\nnot.</p>\n<p>Changes made to storage should be discarded.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.offchain_worker\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">offchain_worker</a>(\n    header: &amp;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT\n)</h4></section></summary><div class=\"docblock\"><p>Start an offchain worker and generate extrinsics.</p>\n</div></details></div></details>",0,"subspace_runtime::Executive"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-ExecuteBlock%3CBlock%3E-for-Executive%3CSystem,+Block,+Context,+UnsignedValidator,+AllPalletsWithSystem,+COnRuntimeUpgrade%3E\" class=\"impl\"><a href=\"#impl-ExecuteBlock%3CBlock%3E-for-Executive%3CSystem,+Block,+Context,+UnsignedValidator,+AllPalletsWithSystem,+COnRuntimeUpgrade%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;System, Block, Context, UnsignedValidator, AllPalletsWithSystem, COnRuntimeUpgrade&gt; ExecuteBlock&lt;Block&gt; for Executive&lt;System, Block, Context, UnsignedValidator, AllPalletsWithSystem, COnRuntimeUpgrade&gt;<div class=\"where\">where\n    System: Config + EnsureInherentsAreFirst&lt;Block&gt;,\n    Block: Block&lt;Header = &lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT, Hash = &lt;System as Config&gt;::Hash&gt;,\n    Context: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a>,\n    AllPalletsWithSystem: OnRuntimeUpgrade + BeforeAllRuntimeMigrations + OnInitialize&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; + OnIdle&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; + OnFinalize&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; + OffchainWorker&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt;,\n    COnRuntimeUpgrade: OnRuntimeUpgrade,\n    &lt;Block as Block&gt;::Extrinsic: Checkable&lt;Context&gt; + Codec,\n    &lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked: Applyable + GetDispatchInfo,\n    &lt;&lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked as Applyable&gt;::Call: Dispatchable&lt;Info = DispatchInfo, PostInfo = PostDispatchInfo&gt;,\n    &lt;&lt;&lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked as Applyable&gt;::Call as Dispatchable&gt;::RuntimeOrigin: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;System as Config&gt;::AccountId&gt;&gt;,\n    UnsignedValidator: ValidateUnsigned&lt;Call = &lt;&lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked as Applyable&gt;::Call&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.execute_block\" class=\"method trait-impl\"><a href=\"#method.execute_block\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">execute_block</a>(block: Block)</h4></section></summary><div class='docblock'>Execute the given <code>block</code>. <a>Read more</a></div></details></div></details>","ExecuteBlock<Block>","subspace_runtime::Executive"]],
"subspace_test_runtime":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Executive%3CSystem,+Block,+Context,+UnsignedValidator,+AllPalletsWithSystem,+COnRuntimeUpgrade%3E\" class=\"impl\"><a href=\"#impl-Executive%3CSystem,+Block,+Context,+UnsignedValidator,+AllPalletsWithSystem,+COnRuntimeUpgrade%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;System, Block, Context, UnsignedValidator, AllPalletsWithSystem, COnRuntimeUpgrade&gt; Executive&lt;System, Block, Context, UnsignedValidator, AllPalletsWithSystem, COnRuntimeUpgrade&gt;<div class=\"where\">where\n    System: Config + EnsureInherentsAreFirst&lt;Block&gt;,\n    Block: Block&lt;Header = &lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT, Hash = &lt;System as Config&gt;::Hash&gt;,\n    Context: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a>,\n    AllPalletsWithSystem: OnRuntimeUpgrade + BeforeAllRuntimeMigrations + OnInitialize&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; + OnIdle&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; + OnFinalize&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; + OffchainWorker&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt;,\n    COnRuntimeUpgrade: OnRuntimeUpgrade,\n    &lt;Block as Block&gt;::Extrinsic: Checkable&lt;Context&gt; + Codec,\n    &lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked: Applyable + GetDispatchInfo,\n    &lt;&lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked as Applyable&gt;::Call: Dispatchable&lt;Info = DispatchInfo, PostInfo = PostDispatchInfo&gt;,\n    &lt;&lt;&lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked as Applyable&gt;::Call as Dispatchable&gt;::RuntimeOrigin: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;System as Config&gt;::AccountId&gt;&gt;,\n    UnsignedValidator: ValidateUnsigned&lt;Call = &lt;&lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked as Applyable&gt;::Call&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.execute_on_runtime_upgrade\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">execute_on_runtime_upgrade</a>() -&gt; Weight</h4></section></summary><div class=\"docblock\"><p>Execute all <code>OnRuntimeUpgrade</code> of this runtime, and return the aggregate weight.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.initialize_block\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">initialize_block</a>(\n    header: &amp;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT\n)</h4></section></summary><div class=\"docblock\"><p>Start the execution of a particular block.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.execute_block\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">execute_block</a>(block: Block)</h4></section></summary><div class=\"docblock\"><p>Actually execute all transitions for <code>block</code>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.finalize_block\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">finalize_block</a>(\n) -&gt; &lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT</h4></section></summary><div class=\"docblock\"><p>Finalize the block - it is up the caller to ensure that all header fields are valid\nexcept state-root.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.apply_extrinsic\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">apply_extrinsic</a>(\n    uxt: &lt;Block as Block&gt;::Extrinsic\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>, DispatchError&gt;, TransactionValidityError&gt;</h4></section></summary><div class=\"docblock\"><p>Apply extrinsic outside of the block execution function.</p>\n<p>This doesn’t attempt to validate anything regarding the block, but it builds a list of uxt\nhashes.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.validate_transaction\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">validate_transaction</a>(\n    source: TransactionSource,\n    uxt: &lt;Block as Block&gt;::Extrinsic,\n    block_hash: &lt;Block as Block&gt;::Hash\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;ValidTransaction, TransactionValidityError&gt;</h4></section></summary><div class=\"docblock\"><p>Check a given signed transaction for validity. This doesn’t execute any\nside-effects; it merely checks whether the transaction would panic if it were included or\nnot.</p>\n<p>Changes made to storage should be discarded.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.offchain_worker\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">offchain_worker</a>(\n    header: &amp;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT\n)</h4></section></summary><div class=\"docblock\"><p>Start an offchain worker and generate extrinsics.</p>\n</div></details></div></details>",0,"subspace_test_runtime::Executive"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-ExecuteBlock%3CBlock%3E-for-Executive%3CSystem,+Block,+Context,+UnsignedValidator,+AllPalletsWithSystem,+COnRuntimeUpgrade%3E\" class=\"impl\"><a href=\"#impl-ExecuteBlock%3CBlock%3E-for-Executive%3CSystem,+Block,+Context,+UnsignedValidator,+AllPalletsWithSystem,+COnRuntimeUpgrade%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;System, Block, Context, UnsignedValidator, AllPalletsWithSystem, COnRuntimeUpgrade&gt; ExecuteBlock&lt;Block&gt; for Executive&lt;System, Block, Context, UnsignedValidator, AllPalletsWithSystem, COnRuntimeUpgrade&gt;<div class=\"where\">where\n    System: Config + EnsureInherentsAreFirst&lt;Block&gt;,\n    Block: Block&lt;Header = &lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT, Hash = &lt;System as Config&gt;::Hash&gt;,\n    Context: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a>,\n    AllPalletsWithSystem: OnRuntimeUpgrade + BeforeAllRuntimeMigrations + OnInitialize&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; + OnIdle&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; + OnFinalize&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; + OffchainWorker&lt;&lt;&lt;&lt;System as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt;,\n    COnRuntimeUpgrade: OnRuntimeUpgrade,\n    &lt;Block as Block&gt;::Extrinsic: Checkable&lt;Context&gt; + Codec,\n    &lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked: Applyable + GetDispatchInfo,\n    &lt;&lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked as Applyable&gt;::Call: Dispatchable&lt;Info = DispatchInfo, PostInfo = PostDispatchInfo&gt;,\n    &lt;&lt;&lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked as Applyable&gt;::Call as Dispatchable&gt;::RuntimeOrigin: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;System as Config&gt;::AccountId&gt;&gt;,\n    UnsignedValidator: ValidateUnsigned&lt;Call = &lt;&lt;&lt;Block as Block&gt;::Extrinsic as Checkable&lt;Context&gt;&gt;::Checked as Applyable&gt;::Call&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.execute_block\" class=\"method trait-impl\"><a href=\"#method.execute_block\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">execute_block</a>(block: Block)</h4></section></summary><div class='docblock'>Execute the given <code>block</code>. <a>Read more</a></div></details></div></details>","ExecuteBlock<Block>","subspace_test_runtime::Executive"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()