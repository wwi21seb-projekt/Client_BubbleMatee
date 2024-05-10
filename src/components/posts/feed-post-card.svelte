<!--Component for a single post-->
<script lang="ts">
	import { FeedPostFooter, FeedPostMain, FeedPostHeader, FeedPostLocation } from '$components';
	import type { Comment, Post } from '$domains';
	import { isLoggedIn } from '$stores';
	export let post: Post;
	export let deletePost: (postId: string) => void;
	export let likePost: (postId: string) => void;
	export let unlikePost: (postId: string) => void;

	//function to delete this post -> calls a passed function
	function deleteThisPost(): void {
		deletePost(post.postId);
	}

	//function to delete this post -> calls a passed function
	function likeThisPost(): void {
		likePost(post.postId);
	}

	//function to delete this post -> calls a passed function
	function unlikeThisPost(): void {
		unlikePost(post.postId);
	}

	function toggleLike() {
		if (isLoggedIn)
		{
		if (post.liked)
		{
			unlikeThisPost()
		}
		else{
			likeThisPost()
		}
	}
}
	let comments: Array<Comment> = new Array<Comment>();
	function loadMoreComments(): void
	{
		console.log("LOAS")
		const exampleComment: Comment = {
		commentId: Math.floor(Math.random() * 1000) + 1,
		content: "Das ist ein Beispielkommentar.",
		author: {
			username: "Max Mustermann",
			nickname: "max.mustermann",
			profilePictureUrl: ""
		},
		creationDate: new Date()
		
		};
		comments = comments.concat(exampleComment)
		console.log(comments)
	}
	
</script>

<!--Component contains the header (Username/ Profile Picture etc/ the main post psrt (image/ text) and the footer (Likes and comments))-->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:dblclick={toggleLike} class="m-4">
	<div
		class="bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 w-full p-4 rounded-xl"
	>
		<header>
			<FeedPostHeader
				date={post.creationDate}
				author={post.author}
				deletePost={deleteThisPost}
				{post}
			/>
		</header>
		<main class="card w-full !bg-transparent my-2">
			<FeedPostMain text={post.content} />
			{#if post.location}
				<FeedPostLocation location={post.location} />
			{/if}
		</main>
		<footer>
			<FeedPostFooter
				post= {post}
				likePost={likeThisPost}
				unlikePost={unlikeThisPost}
				comments={comments}
				loadMoreComments={loadMoreComments}

			/>
		</footer>
	</div>
</div>
