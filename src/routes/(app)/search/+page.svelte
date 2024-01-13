<script lang="ts">
	import { Posts } from '$components';
	import type { Post } from '$domains';
	import { fetchNextPostsFeed } from '$utils';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { globalConfig } from '$utils';
	// lastPostID -> The ID of the last Post -> is needed to load the next posts
	let lastPostID: string = '';
	let lastPage: boolean = true;
	let posts: Array<Post> = new Array<Post>();
	const toastStore = getToastStore();

	//load the first posts directly
	onMount(() => {
		loadMorePosts();
	});

	//function that can be called from the post component to trigger the loading of more posts
	async function loadMorePosts() {
		try {
			const data = await fetchNextPostsFeed(lastPostID, globalConfig.limit, 'global');
			posts = posts.concat(data.posts);
			lastPage = posts.length === data.overallRecords;
			lastPostID = data.lastPostId!;
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

<Posts {posts} {loadMorePosts} {lastPage}></Posts>
