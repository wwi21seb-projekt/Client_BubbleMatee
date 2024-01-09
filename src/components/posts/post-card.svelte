<!--Component for a single post-->
<script lang="ts">
	import { PostMain } from '$components';
	import type { Post } from '$domains';
	import PostFooter from './post-card-elements/post-footer.svelte';
	import PostHeader from './post-card-elements/post-header.svelte';
	export let post: Post;
</script>

<div
	class="card bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 w-full p-4 rounded-xl"
>
	<header>
		<PostHeader date={post.date} author={post.author} />
	</header>
	<hr class="opacity-50 mt-2 mb-2" />
	<PostMain text={post.content} />
	<hr class="opacity-50 mt-2 mb-2" />
	<footer>
		<PostFooter />
	</footer>
</div>
<hr class="!border-t-1 mb-1 mt-1" />
