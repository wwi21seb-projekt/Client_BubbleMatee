<!--Component for a single post-->
<script lang="ts">
	import { FeedPostFooter, FeedPostMain, FeedPostHeader, FeedPostLocation } from '$components';
	import type { Comment, CommentData, CommentResponse, ErrorObject, ErrorResponse, Post, PostCommentResponse } from '$domains';
	import type { CommentList } from '$domains/ServerDomains/comments';
	import { isLoggedIn } from '$stores';
	import { getErrorMessage } from '$utils';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	export let post: Post;
	export let deletePost: (postId: string) => void;
	export let likePost: (postId: string) => void;
	export let unlikePost: (postId: string) => void;
	export let loadMoreComments: (postId: string, offset: number) => Promise<ErrorResponse | CommentResponse>;
	export let postComment: (postId: string, content: string) => Promise<ErrorResponse | PostCommentResponse>;
	const toastStore = getToastStore();

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

	function toggleLike(): void {
		if (isLoggedIn) {
			if (post.liked) {
				unlikeThisPost();
			} else {
				likeThisPost();
			}
		}
	}
	let comments: Array<Comment> = new Array<Comment>();
	let commentData: CommentData = {
		comments: comments,
		overallRecords: 1
	};
	async function loadMoreCommentsForThisPost(): Promise<CommentData> {
		const body : CommentResponse | ErrorResponse = await loadMoreComments(post.postId, comments.length);
		if (body.error) {
			const data = body.data as ErrorObject
			if (data.error) {
				const t: ToastSettings = {
					message: getErrorMessage(data.error.code, false),
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
			}
		} else {
			const data = body.data as CommentList
			const newComments: Array<Comment> = data.records.map((record: Comment) => ({
				commentId: record.commentId,
				author: {
					username: record.author.username,
					nickname: record.author.nickname,
					profilePictureUrl: record.author.profilePictureUrl
				},
				creationDate: new Date(record.creationDate),
				content: record.content
			}));
			comments = comments.concat(newComments);
			commentData = {
			comments: comments,
			overallRecords: data.pagination.records
		};
	}
		return commentData;
	}

	async function commentThisPost(content: string): Promise<CommentData> {
		const body = await postComment(post.postId, content);
		if (body.error) {
			if (body.data.error) {
				const t: ToastSettings = {
					message: getErrorMessage(body.data.error.code, false),
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
			}
		} else {
			const newComment: Comment = {
				commentId: body.data.commentId,
				author: body.data.author,
				content: body.data.content,
				creationDate: new Date(body.data.creationDate)
			};
			comments = comments.concat(newComment);
		}
		let commentDataNew = {
			comments: comments,
			overallRecords: commentData.overallRecords + 1
		};
		commentData = commentDataNew;
		return commentData;
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
				{post}
				likePost={likeThisPost}
				unlikePost={unlikeThisPost}
				{commentData}
				loadMoreComments={loadMoreCommentsForThisPost}
				commentPost={commentThisPost}
			/>
		</footer>
	</div>
</div>
