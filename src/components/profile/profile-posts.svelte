<script lang="ts">
	import { Feed } from '$components';
	import type { Post, UserInfo } from '$domains';
	import { fetchNextPostsUser } from '$utils';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { globalConfig } from '$utils';
	import { onMount } from 'svelte';
	let lastPage: boolean = true;
	let posts: Array<Post> = new Array<Post>();
	const toastStore = getToastStore();
	export let user: UserInfo;
	function notifyDeletedPost(): void {
		user.posts = user.posts - 1;
	}
	//load the first posts directly
	onMount(() => {
		loadMorePosts();
	});

	//function that can be called from the post component to trigger the loading of more posts
	async function loadMorePosts() {
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
		}
	}
</script>

<Feed {posts} {loadMorePosts} {lastPage} {notifyDeletedPost}></Feed>
