<!-- List component that contains multiple posts.  -->
<script lang="ts">
	export let posts: Array<Post>;
	export let loadMorePosts: () => Promise<void>;
	export let lastPage: boolean;
	export let classString: string = 'w-full sm:w-3/4 md:w-full lg:w-3/4';
	export let notifyDeletedPost: (() => void) | null = null;
	export let nothingFoundMessage: string | null;
	export let nothingFoundSubMessage: string | null;
	import { LoadMoreComponent, FeedPostCard, NothingFoundComponent } from '$components';
	import type { Post } from '$domains';
	import { loading } from '$stores';
	import { getErrorMessage } from '$utils';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	//function to delete a post. Is passed to and called from each induciduall post-card-component
	async function deletePost(postId: string) {
		try {
			const response = await fetch(`/api/posts/${postId}`, {
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
				posts = posts.filter((post) => post.postId !== postId);
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
</script>

<div class="flex w-full justify-center items-center">
	<!--Switch the width on different devices-->
	<div class={classString}>
		{#if posts.length > 0}
			{#each posts as post (post.postId)}
				<FeedPostCard {post} {deletePost}></FeedPostCard>
			{/each}
		{:else if !$loading}
			<div class=" mx-4">
				<NothingFoundComponent
					message={nothingFoundMessage ? nothingFoundMessage : 'Keine Post gefunden'}
					submessage={nothingFoundSubMessage ? nothingFoundSubMessage : null}
				/>
			</div>
		{/if}
		<!-- Button to load the next posts - is invisible, if there are no more posts-->
		{#if !lastPage}
			<div class=" m-4">
				<LoadMoreComponent loadMore={loadMorePosts} />
			</div>
		{/if}
	</div>
</div>
