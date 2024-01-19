<!--Component for a single post-->
<script lang="ts">
	import { FeedPostMain } from '$components';
	import type { Post } from '$domains';
	import PostFooter from './feed-post-card-elements/feed-post-footer.svelte';
	import PostHeader from './feed-post-card-elements/feed-post-header.svelte';
	export let post: Post;
	export let deletePost: (postId: string) => void;

	function deleteThisPost(): void{
		deletePost(post.postId)
	}

</script>

<!--Component contains the header (Username/ Profile Picture etc/ the main post psrt (image/ text) and the footer (Likes and comments))-->
<div class="m-4">
	<div
		class="card bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 w-full p-4 rounded-xl"
	>
		<header>
			<PostHeader date={post.date} author={post.author} deletePost={deleteThisPost} />
		</header>
		<FeedPostMain text={post.content} />
		<footer>
			<PostFooter />
		</footer>
	</div>
</div>
