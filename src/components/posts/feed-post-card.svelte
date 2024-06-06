<!--Component for a single post-->
<script lang="ts">
	import {
		FeedPostFooter,
		FeedPostMain,
		FeedPostHeader,
		FeedPostLocation,
		FeedPostCard
	} from '$components';
	import type {
		Comment,
		CommentData,
		CommentResponse,
		ErrorObject,
		ErrorResponse,
		PostWithRepost,
		PostCommentResponse
	} from '$domains';
	import type { CommentList } from '$domains/ServerDomains/comments';
	import { isLoggedIn } from '$stores';
	import { getErrorMessage } from '$utils';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	export let post: PostWithRepost;
	export let likePost: ((postId: string) => void) | null;
	export let unlikePost: ((postId: string) => void) | null;
	export let loadMoreComments:
		| ((postId: string, offset: number) => Promise<ErrorResponse | CommentResponse>)
		| null;
	export let postComment:
		| ((postId: string, content: string) => Promise<ErrorResponse | PostCommentResponse>)
		| null;
	const toastStore = getToastStore();
	export let deletePost: ((postId: string) => void) | null;
	export let isRepost: boolean = false;
	//function to delete this post -> calls a passed function
	function deleteThisPost(): void {
		if (deletePost) {
			deletePost(post.postId);
		}
	}

	//function to delete this post -> calls a passed function
	function likeThisPost(): void {
		if (likePost) {
			likePost(post.postId);
		}
	}

	//function to delete this post -> calls a passed function
	function unlikeThisPost(): void {
		if (unlikePost) {
			unlikePost(post.postId);
		}
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
		if (loadMoreComments) {
			const body: CommentResponse | ErrorResponse = await loadMoreComments(
				post.postId,
				comments.length
			);
			if (body.error) {
				const data = body.data as ErrorObject;
				if (data.error) {
					const t: ToastSettings = {
						message: getErrorMessage(data.error.code, false),
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
				}
			} else {
				const data = body.data as CommentList;
				if (data.records) {
					const newComments: Array<Comment> = data.records.map((record: Comment) => ({
						commentId: record.commentId,
						author: {
							username: record.author.username,
							nickname: record.author.nickname,
							picture: record.author.picture
						},
						creationDate: new Date(record.creationDate),
						content: record.content
					}));
					comments = comments.concat(newComments);
				}
				commentData = {
					comments: comments,
					overallRecords: data.pagination.records
				};
			}
			commentData.overallRecords = 0;
		}
		return commentData;
	}

	async function commentThisPost(content: string): Promise<CommentData> {
		if (postComment) {
			const body = await postComment(post.postId, content);
			if (body.error) {
				const data = body.data as ErrorObject;
				if (data.error) {
					const t: ToastSettings = {
						message: getErrorMessage(data.error.code, false),
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
				}
			} else {
				const data = body.data as Comment;
				const newComment: Comment = {
					commentId: data.commentId,
					author: data.author,
					content: data.content,
					creationDate: new Date(data.creationDate)
				};
				comments = comments.concat(newComment);
			}
			let commentDataNew = {
				comments: comments,
				overallRecords: commentData.overallRecords + 1
			};
			commentData = commentDataNew;
		}
		return commentData;
	}
</script>

<!--Component contains the header (Username/ Profile Picture etc/ the main post psrt (image/ text) and the footer (Likes and comments))-->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:dblclick={toggleLike} class="m-4">
	<div
		class={`${isRepost ? 
		"!bg-gradient-to-br dark:from-tertiary-400 dark:to-secondary-400 from-primary-500 to-primary-700" :
		"!bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600"} 
		w-full p-4 rounded-xl`}

	>
		<header>
			<FeedPostHeader
				date={post.creationDate}
				author={post.author}
				deletePost={deleteThisPost}
				{post}
				{isRepost}
			/>
		</header>
		{#if post.repost && !isRepost}
		<div class="w-full !bg-transparent my-2">
				<FeedPostCard
					isRepost={true}
					deletePost={() => {}}
					post={post.repost}
					likePost={null}
					postComment={null}
					loadMoreComments={null}
					unlikePost={null}
				/>
		</div>
			{/if}
		<div class="card w-full !bg-transparent my-2 mx-2">
			<FeedPostMain text={post.content} picture={post.picture}/>
			{#if post.location}
			<FeedPostLocation location={post.location} />
			{/if}
			
		</div>
		{#if !isRepost}
			<footer>
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
			</footer>
		{/if}
	</div>
</div>
