<!-- List component that contains multiple posts.  -->
<script lang="ts">
	export let postData: PostData;
	export let loadMorePosts: () => Promise<void>;
	export let classString: string = 'w-full sm:w-3/4 md:w-full lg:w-3/4 px-4';
	export let notifyDeletedPost: (() => void) | null = null;
	export let nothingFoundMessage: string | null;
	export let nothingFoundSubMessage: string | null;
	import { LoadMoreComponent, FeedPostCard, NothingFoundComponent } from '$components';
	import type { CommentResponse, ErrorResponse, PostData, PostWithRepost } from '$domains';
	import type { PostCommentResponse } from '$domains/ServerResponses';
	import { loading } from '$stores';
	import { getErrorMessage, globalConfig } from '$utils';
	import { getToastStore, type ToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	const toastStore: ToastStore = getToastStore();
	//function to delete a post. Is passed to and called from each induciduall post-card-component
	async function deletePost(postId: string) {
		try {
			const response: Response = await fetch(`/api/posts/${postId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const body = await response.json();
			//show error if unsuccesfull
			if (body.error) {
				if (body.data.error) {
					const t: ToastSettings = {
						message: getErrorMessage(body.data.error.code, false),
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
				}
				//show confirmation if succesfull
			} else {
				//delete from local array
				postData.posts = postData.posts.filter((post) => post.postId !== postId);
				const t: ToastSettings = {
					message: 'Der Beitrag wurde gelöscht',
					background: 'variant-filled-success'
				};
				toastStore.trigger(t);
				if (notifyDeletedPost) {
					notifyDeletedPost();
				}
			}
			return body;
		} catch (e) {
			console.error(e);
		}
	}
	//function to unlike a post. Is passed to and called from each induciduall post-card-component
	async function unlikePost(postId: string) {
		try {
			const response: Response = await fetch(`/api/posts/${postId}/likes`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const body = await response.json();
			//show error if unsuccesfull
			if (body.error) {
				if (body.data.error) {
					const t: ToastSettings = {
						message: getErrorMessage(body.data.error.code, false),
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
				}
			} else {
				const post: PostWithRepost = postData.posts.filter((post) => post.postId === postId)[0];
				post.liked = false;
				post.likes = post.likes - 1;
				postData.posts = postData.posts;
			}
			return body;
		} catch (e) {
			console.error(e);
		}
	}
	//function to like a post. Is passed to and called from each induciduall post-card-component
	async function likePost(postId: string) {
		try {
			const response: Response = await fetch(`/api/posts/${postId}/likes`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const body = await response.json();
			//show error if unsuccesfull
			if (body.error) {
				if (body.data.error) {
					const t: ToastSettings = {
						message: getErrorMessage(body.data.error.code, false),
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
				}
			} else {
				const post: PostWithRepost = postData.posts.filter((post) => post.postId === postId)[0];
				post.liked = true;
				post.likes = post.likes + 1;
				postData.posts = postData.posts;
			}
			return body;
		} catch (e) {
			console.error(e);
		}
	}
	async function loadMoreComments(
		postId: string,
		offset: number
	): Promise<ErrorResponse | CommentResponse> {
		try {
			const response: Response = await fetch(
				`/api/posts/${postId}/comments?offset=${offset}&limit=${globalConfig.limit}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			const body: ErrorResponse | CommentResponse = await response.json();
			return body;
		} catch (e) {
			console.error(e);
			const errorResponse: ErrorResponse = {
				error: true,
				data: {
					error: {
						code: 'internal_server_error',
						message: 'Failed to load comments'
					}
				}
			};
			return errorResponse;
		}
	}
	async function postComment(
		postId: string,
		content: string
	): Promise<ErrorResponse | PostCommentResponse> {
		try {
			const response: Response = await fetch(`/api/posts/${postId}/comments`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					content: content
				})
			});
			const body: ErrorResponse | PostCommentResponse = await response.json();
			return body;
		} catch (e) {
			const errorResponse: ErrorResponse = {
				error: true,
				data: {
					error: {
						code: 'internal_server_error',
						message: 'Failed to load comments'
					}
				}
			};
			return errorResponse;
		}
	}
</script>

<div class="flex w-full justify-center items-center">
	<!--Switch the width on different devices-->
	<div class={classString}>
		{#if postData.posts.length > 0}
			{#each postData.posts as post (post.postId)}
				<FeedPostCard {post} {deletePost} {likePost} {unlikePost} {loadMoreComments} {postComment}
				></FeedPostCard>
			{/each}
		{:else if !$loading}
			<div class="flex justify-center">
				<NothingFoundComponent
					message={nothingFoundMessage ? nothingFoundMessage : 'Keine Posts gefunden'}
					submessage={nothingFoundSubMessage ? nothingFoundSubMessage : null}
				/>
			</div>
		{/if}
		<!-- Button to load the next posts - is invisible, if there are no more posts-->
		{#if postData.posts.length < postData.overallRecords}
			<LoadMoreComponent loadMore={loadMorePosts} />
		{/if}
	</div>
</div>
