(function() {var type_impls = {
"domain_block_preprocessor":[["<section id=\"impl-StructuralPartialEq-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"impl\"><a href=\"#impl-StructuralPartialEq-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;BlockNumber, BlockHash, StateRoot&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.StructuralPartialEq.html\" title=\"trait core::marker::StructuralPartialEq\">StructuralPartialEq</a> for ExtractedStateRootsFromProof&lt;BlockNumber, BlockHash, StateRoot&gt;</h3></section>","StructuralPartialEq","domain_block_preprocessor::stateless_runtime::ExtractedStateRoots"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PartialEq-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"impl\"><a href=\"#impl-PartialEq-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;BlockNumber, BlockHash, StateRoot&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> for ExtractedStateRootsFromProof&lt;BlockNumber, BlockHash, StateRoot&gt;<div class=\"where\">where\n    BlockNumber: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a>,\n    BlockHash: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a>,\n    StateRoot: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.eq\" class=\"method trait-impl\"><a href=\"#method.eq\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html#tymethod.eq\" class=\"fn\">eq</a>(\n    &amp;self,\n    other: &amp;ExtractedStateRootsFromProof&lt;BlockNumber, BlockHash, StateRoot&gt;\n) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests for <code>self</code> and <code>other</code> values to be equal, and is used\nby <code>==</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.ne\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/cmp.rs.html#242\">source</a></span><a href=\"#method.ne\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html#method.ne\" class=\"fn\">ne</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests for <code>!=</code>. The default implementation is almost always\nsufficient, and should not be overridden without very good reason.</div></details></div></details>","PartialEq","domain_block_preprocessor::stateless_runtime::ExtractedStateRoots"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Decode-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"impl\"><a href=\"#impl-Decode-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;BlockNumber, BlockHash, StateRoot&gt; Decode for ExtractedStateRootsFromProof&lt;BlockNumber, BlockHash, StateRoot&gt;<div class=\"where\">where\n    BlockInfo&lt;BlockNumber, BlockHash&gt;: Decode,\n    StateRoot: Decode,\n    <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;(DomainId, BlockInfo&lt;BlockNumber, BlockHash&gt;, StateRoot)&gt;: Decode,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.decode\" class=\"method trait-impl\"><a href=\"#method.decode\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">decode</a>&lt;__CodecInputEdqy&gt;(\n    __codec_input_edqy: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;mut __CodecInputEdqy</a>\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;ExtractedStateRootsFromProof&lt;BlockNumber, BlockHash, StateRoot&gt;, Error&gt;<div class=\"where\">where\n    __CodecInputEdqy: Input,</div></h4></section></summary><div class='docblock'>Attempt to deserialise the value from input.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.decode_into\" class=\"method trait-impl\"><a href=\"#method.decode_into\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">decode_into</a>&lt;I&gt;(\n    input: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;mut I</a>,\n    dst: &amp;mut <a class=\"union\" href=\"https://doc.rust-lang.org/nightly/core/mem/maybe_uninit/union.MaybeUninit.html\" title=\"union core::mem::maybe_uninit::MaybeUninit\">MaybeUninit</a>&lt;Self&gt;\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;DecodeFinished, Error&gt;<div class=\"where\">where\n    I: Input,</div></h4></section></summary><div class='docblock'>Attempt to deserialize the value from input into a pre-allocated piece of memory. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.skip\" class=\"method trait-impl\"><a href=\"#method.skip\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">skip</a>&lt;I&gt;(input: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;mut I</a>) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>, Error&gt;<div class=\"where\">where\n    I: Input,</div></h4></section></summary><div class='docblock'>Attempt to skip the encoded value from input. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.encoded_fixed_size\" class=\"method trait-impl\"><a href=\"#method.encoded_fixed_size\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">encoded_fixed_size</a>() -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a>&gt;</h4></section></summary><div class='docblock'>Returns the fixed encoded size of the type. <a>Read more</a></div></details></div></details>","Decode","domain_block_preprocessor::stateless_runtime::ExtractedStateRoots"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Encode-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"impl\"><a href=\"#impl-Encode-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;BlockNumber, BlockHash, StateRoot&gt; Encode for ExtractedStateRootsFromProof&lt;BlockNumber, BlockHash, StateRoot&gt;<div class=\"where\">where\n    BlockInfo&lt;BlockNumber, BlockHash&gt;: Encode,\n    StateRoot: Encode,\n    <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;(DomainId, BlockInfo&lt;BlockNumber, BlockHash&gt;, StateRoot)&gt;: Encode,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.size_hint\" class=\"method trait-impl\"><a href=\"#method.size_hint\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">size_hint</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a></h4></section></summary><div class='docblock'>If possible give a hint of expected size of the encoding. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.encode_to\" class=\"method trait-impl\"><a href=\"#method.encode_to\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">encode_to</a>&lt;__CodecOutputEdqy&gt;(\n    &amp;self,\n    __codec_dest_edqy: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;mut __CodecOutputEdqy</a>\n)<div class=\"where\">where\n    __CodecOutputEdqy: Output + ?<a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</div></h4></section></summary><div class='docblock'>Convert self to a slice and append it to the destination.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.encode\" class=\"method trait-impl\"><a href=\"#method.encode\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">encode</a>(&amp;self) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u8.html\">u8</a>&gt; <a href=\"#\" class=\"tooltip\" data-notable-ty=\"Vec&lt;u8&gt;\">ⓘ</a></h4></section></summary><div class='docblock'>Convert self to an owned vector.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.using_encoded\" class=\"method trait-impl\"><a href=\"#method.using_encoded\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">using_encoded</a>&lt;R, F&gt;(&amp;self, f: F) -&gt; R<div class=\"where\">where\n    F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(&amp;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u8.html\">u8</a>]) -&gt; R,</div></h4></section></summary><div class='docblock'>Convert self to a slice and then invoke the given closure with it.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.encoded_size\" class=\"method trait-impl\"><a href=\"#method.encoded_size\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">encoded_size</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a></h4></section></summary><div class='docblock'>Calculates the encoded size. <a>Read more</a></div></details></div></details>","Encode","domain_block_preprocessor::stateless_runtime::ExtractedStateRoots"],["<section id=\"impl-StructuralEq-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"impl\"><a href=\"#impl-StructuralEq-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;BlockNumber, BlockHash, StateRoot&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.StructuralEq.html\" title=\"trait core::marker::StructuralEq\">StructuralEq</a> for ExtractedStateRootsFromProof&lt;BlockNumber, BlockHash, StateRoot&gt;</h3></section>","StructuralEq","domain_block_preprocessor::stateless_runtime::ExtractedStateRoots"],["<section id=\"impl-Eq-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"impl\"><a href=\"#impl-Eq-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;BlockNumber, BlockHash, StateRoot&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> for ExtractedStateRootsFromProof&lt;BlockNumber, BlockHash, StateRoot&gt;<div class=\"where\">where\n    BlockNumber: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a>,\n    BlockHash: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a>,\n    StateRoot: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a>,</div></h3></section>","Eq","domain_block_preprocessor::stateless_runtime::ExtractedStateRoots"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-TypeInfo-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"impl\"><a href=\"#impl-TypeInfo-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;BlockNumber, BlockHash, StateRoot&gt; TypeInfo for ExtractedStateRootsFromProof&lt;BlockNumber, BlockHash, StateRoot&gt;<div class=\"where\">where\n    BlockInfo&lt;BlockNumber, BlockHash&gt;: TypeInfo + 'static,\n    StateRoot: TypeInfo + 'static,\n    <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;(DomainId, BlockInfo&lt;BlockNumber, BlockHash&gt;, StateRoot)&gt;: TypeInfo + 'static,\n    BlockNumber: TypeInfo + 'static,\n    BlockHash: TypeInfo + 'static,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle\" open><summary><section id=\"associatedtype.Identity\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Identity\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">Identity</a> = ExtractedStateRootsFromProof&lt;BlockNumber, BlockHash, StateRoot&gt;</h4></section></summary><div class='docblock'>The type identifying for which type info is provided. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.type_info\" class=\"method trait-impl\"><a href=\"#method.type_info\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">type_info</a>() -&gt; Type</h4></section></summary><div class='docblock'>Returns the static type identifier for <code>Self</code>.</div></details></div></details>","TypeInfo","domain_block_preprocessor::stateless_runtime::ExtractedStateRoots"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"impl\"><a href=\"#impl-Debug-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;BlockNumber, BlockHash, StateRoot&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for ExtractedStateRootsFromProof&lt;BlockNumber, BlockHash, StateRoot&gt;<div class=\"where\">where\n    BlockNumber: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,\n    BlockHash: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,\n    StateRoot: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/fmt/struct.Error.html\" title=\"struct core::fmt::Error\">Error</a>&gt;</h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","domain_block_preprocessor::stateless_runtime::ExtractedStateRoots"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"impl\"><a href=\"#impl-Clone-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;BlockNumber, BlockHash, StateRoot&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for ExtractedStateRootsFromProof&lt;BlockNumber, BlockHash, StateRoot&gt;<div class=\"where\">where\n    BlockNumber: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a>,\n    BlockHash: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a>,\n    StateRoot: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(\n    &amp;self\n) -&gt; ExtractedStateRootsFromProof&lt;BlockNumber, BlockHash, StateRoot&gt;</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/clone.rs.html#169\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Self</a>)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","domain_block_preprocessor::stateless_runtime::ExtractedStateRoots"],["<section id=\"impl-EncodeLike-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"impl\"><a href=\"#impl-EncodeLike-for-ExtractedStateRootsFromProof%3CBlockNumber,+BlockHash,+StateRoot%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;BlockNumber, BlockHash, StateRoot&gt; EncodeLike for ExtractedStateRootsFromProof&lt;BlockNumber, BlockHash, StateRoot&gt;<div class=\"where\">where\n    BlockInfo&lt;BlockNumber, BlockHash&gt;: Encode,\n    StateRoot: Encode,\n    <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;(DomainId, BlockInfo&lt;BlockNumber, BlockHash&gt;, StateRoot)&gt;: Encode,</div></h3></section>","EncodeLike","domain_block_preprocessor::stateless_runtime::ExtractedStateRoots"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()