<!--Component for a single post-->
<script lang="ts">
	import { FeedPostFooter, FeedPostMain, FeedPostHeader, FeedPostLocation } from '$components';
	import type { Post } from '$domains';
	export let post: Post;
	export let deletePost: (postId: string) => void;
	//function to delete this post -> calls a passed function
	function deleteThisPost(): void {
		deletePost(post.postId);
	}
</script>

<!--Component contains the header (Username/ Profile Picture etc/ the main post psrt (image/ text) and the footer (Likes and comments))-->
<div class="m-4">
	<div
		class="bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 w-full p-4 rounded-xl"
	>
		<header>
			<FeedPostHeader date={post.creationDate} author={post.author} deletePost={deleteThisPost} />
		</header>
		<main class="card w-full !bg-transparent my-2">
			<FeedPostMain text={post.content} />
			{#if post.location}
				<FeedPostLocation location={post.location} />
			{/if}
		</main>
		<footer>
			<FeedPostFooter />
		</footer>
	</div>
</div>
