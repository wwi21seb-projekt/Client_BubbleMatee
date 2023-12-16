<script lang=ts>
	import { PostMain } from "$components";
	import PostFooter from "./post-card-elements/post-footer.svelte";
	import PostHeader from "./post-card-elements/post-header.svelte";
    export let imageUrl: string;
    export let text: string
    console.log(imageUrl)
    console.log(text)
</script>
<div class="card bg-gradient-to-br from-tertiary-900 to-secondary-900 w-full p-4 rounded-xl">
    <header >
    <PostHeader/>
    </header>
    <hr class="opacity-50 mt-2 mb-2" />
    <PostMain imageUrl={imageUrl} text={text}/>
    <hr class="opacity-50 mt-2 mb-2" />
    <footer >
    <PostFooter/>
    </footer>
</div>
<hr class="!border-t-1 mb-1 mt-1" />

