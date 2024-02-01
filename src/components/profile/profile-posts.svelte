<script lang="ts">
	import { Feed } from '$components';
	import type { Post, UserInfo } from '$domains';
	import { fetchNextPostsUser } from '$utils';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { globalConfig } from '$utils';
	import { onMount } from 'svelte';
	import { currentUsername, loading } from '$stores';
	let lastPage: boolean = true;
	let posts: Array<Post> = new Array<Post>();
	const toastStore = getToastStore();
	export let user: UserInfo;
	let isOwnUser = $currentUsername === user.username;
	function notifyDeletedPost(): void {
		user.posts = user.posts - 1;
	}
	//load the first posts directly
	onMount(() => {
		loadMorePosts();
	});

	//function that can be called from the post component to trigger the loading of more posts
	async function loadMorePosts() {
		$loading = true;
		try {
			const data = await fetchNextPostsUser(`${posts.length}`, globalConfig.limit, user);
			posts = posts.concat(data.posts);
			lastPage = posts.length === data.overallRecords;
		} catch (error) {
			if (error instanceof ErrorEvent) {
				const t: ToastSettings = {
					message: error.type,
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
			}
		} finally {
			$loading = false;
		}
	}
</script>

<Feed
	{posts}
	{loadMorePosts}
	{lastPage}
	{notifyDeletedPost}
	nothingFoundMessage={'Keine Post gefunden'}
	nothingFoundSubMessage={isOwnUser
		? "Verfasse deinen ersten Post im 'Posten'-Tab!"
		: `${user.username} hat noch nichts gepostet`}
></Feed>
