<script lang="ts">
	import { Posts } from '$components';
	import type { Post, UserInfo } from '$domains';
	import { fetchNextPostsUser } from '$utils';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { globalConfig } from '$utils';
	import { onMount } from 'svelte';
	let lastPage: boolean = true;
	let posts: Array<Post> = new Array<Post>();
	const toastStore = getToastStore();
	export let user: UserInfo;
	//load the first posts directly
	onMount(() => {
		loadMorePosts();
	});

	//function that can be called from the post component to trigger the loading of more posts
	async function loadMorePosts() {
		console.log('loadMorePosts');
		try {
			const data = await fetchNextPostsUser(`${posts.length}`, globalConfig.limit, user);
			console.log(data);
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

<Posts {posts} {loadMorePosts} {lastPage}></Posts>
