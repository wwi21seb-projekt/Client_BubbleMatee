<!--Component for a single post-->
<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { FeedPostFooter, FeedPostMain, FeedPostHeader, FeedPostCard } from '$components';
	import type {
		Comment,
		CommentData,
		CommentResponse,
		ErrorObject,
		ErrorResponse,
		PostWithRepost,
		PostCommentResponse,
		Post
	} from '$domains';
	import type { CommentList } from '$domains/ServerDomains/comments';
	import { isLoggedIn } from '$stores';
	import { getErrorMessage } from '$utils';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	export let post: PostWithRepost;
	export let likePost: ((postId: string) => void) | null;
	export let unlikePost: ((postId: string) => void) | null;
	export let loadMoreComments:
		| ((postId: string, offset: number) => Promise<ErrorResponse | CommentResponse>)
		| null;
	export let postComment:
		| ((postId: string, content: string) => Promise<ErrorResponse | PostCommentResponse>)
		| null;
	export let deletePost: ((postId: string) => void) | null;
	export let isRepost: boolean = false;
	const toastStore = getToastStore();
	const modalStore = getModalStore();
	let comments: Array<Comment> = new Array<Comment>();
	let commentData: CommentData = {
		comments: comments,
		overallRecords: 1,
		isError: false,
		errorText: ''
	};
	function deleteThisPost(currentPost: PostWithRepost | Post | undefined): void {
		if (deletePost && currentPost) {
			deletePost(currentPost.postId);
			invalidateAll();
		}
	}
	function likeThisPost(): void {
		if (likePost) {
			likePost(post.postId);
		}
	}
	function unlikeThisPost(): void {
		if (unlikePost) {
			unlikePost(post.postId);
		}
	}
	function toggleLike(): void {
		if (isLoggedIn) {
			post.liked ? unlikeThisPost() : likeThisPost();
		}
	}
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
					commentData.isError = true;
					commentData.errorText = getErrorMessage(data.error.code, false);
				}
				commentData.isError = true;
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
					overallRecords: data.pagination.records,
					isError: false,
					errorText: ''
				};
			}
			commentData.overallRecords = 0;
		}
		console.log(commentData);
		return commentData;
	}
	async function commentThisPost(content: string): Promise<CommentData> {
		if (postComment && !commentData.isError) {
			const body = await postComment(post.postId, content);
			if (body.error) {
				const data = body.data as ErrorObject;
				if (data.error.code == 'ERR-014') {
					modalStore.close();
				}
				if (data.error) {
					const t: ToastSettings = {
						message: getErrorMessage(data.error.code, false),
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
				}
			} else {
				const data = body.data as Comment;
				let newComment: Array<Comment> = [
					{
						commentId: data.commentId,
						author: data.author,
						content: data.content,
						creationDate: new Date(data.creationDate)
					}
				];
				comments = comments.concat(newComment);
			}
			let commentDataNew: CommentData = {
				comments: comments,
				overallRecords: commentData.overallRecords + 1,
				isError: false,
				errorText: ''
			};
			commentData = commentDataNew;
			post.comments++;
		} else if (commentData.isError) {
			const t: ToastSettings = {
				message: 'Lade zunächst die Kommentare neu, bevor du kommentierst!',
				background: 'variant-filled-warning'
			};
			toastStore.trigger(t);
		}
		return commentData;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:dblclick={toggleLike}>
	<div
		class={`${
			isRepost
				? '!bg-gradient-to-br dark:from-secondary-500 dark:to-secondary-600 from-primary-600 to-primary-700'
				: '!bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-600 from-primary-400 to-primary-600 mb-2'
		} 
		w-full rounded-xl p-4 `}
	>
		{#if post.author}
			<FeedPostHeader
				date={post.creationDate}
				author={post.author}
				deletePost={() => deleteThisPost(post)}
				{post}
				{isRepost}
			/>
			{#if post.repost && !isRepost}
				<div class="card w-full !bg-transparent my-2 mx-0">
					<FeedPostCard
						isRepost={true}
						deletePost={() => deleteThisPost(post.repost)}
						post={post.repost}
						likePost={null}
						postComment={null}
						loadMoreComments={null}
						unlikePost={null}
					/>
				</div>
			{/if}
			<FeedPostMain {post} />
			{#if !isRepost}
				<FeedPostFooter
					{post}
					likePost={likeThisPost}
					unlikePost={unlikeThisPost}
					{commentData}
					loadMoreComments={loadMoreCommentsForThisPost}
					commentPost={commentThisPost}
				/>
			{/if}
		{:else}
			<div class="flex justify-center items-center font-bold">
				Der originale Post wurde gelöscht
			</div>
		{/if}
	</div>
</div>
