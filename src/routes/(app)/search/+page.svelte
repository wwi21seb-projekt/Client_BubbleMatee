<script lang="ts">
	import { Posts } from '$components';
	import type { Post } from '$domains';
	import { fetchNextPosts } from '$utils';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	// lastPostID -> The ID of the last Post -> is needed to load the next posts
	let lastPostID: string = '0';
	let limit: string = '10';
	let lastPage: boolean = true;
	let posts: Array<Post> = new Array<Post>();
	const toastStore = getToastStore();

	//load the first posts directly
	onMount(() => {
		loadMorePosts();
	});

	//function that can be called from the post component to trigger the loading of more posts
	function loadMorePosts() {
		//TODO: Where can we set the limit globally?
		fetchNextPosts(lastPostID, limit, 'global')
			.then((data) => {
				posts = posts.concat(data.posts);
				lastPage = posts.length === data.overallRecords;
				lastPostID = data.lastPostId;
			})
			.catch((error) => {
				const t: ToastSettings = {
					message: error.type,
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
			});
	}
</script>

<Posts {posts} {loadMorePosts} {lastPage}></Posts>
