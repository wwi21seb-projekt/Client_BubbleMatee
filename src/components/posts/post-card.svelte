<!--Component for a single post-->
<script lang="ts">
	import { PostMain } from '$components';
	import type { Post } from '$domains';
	import PostFooter from './post-card-elements/post-footer.svelte';
	import PostHeader from './post-card-elements/post-header.svelte';
	export let post: Post;
</script>

<!--Component contains the header (Username/ Profile Picture etc/ the main post psrt (image/ text) and the footer (Likes and comments))-->
<div class="m-4">
	<div
		class="card bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 w-full p-4 rounded-xl"
	>
		<header>
			<PostHeader date={post.date} author={post.author} />
		</header>
		<PostMain text={post.content} />
		<footer>
			<PostFooter />
		</footer>
	</div>
</div>
