<script lang="ts">
	import { Posts } from '$components';
	import type { Post } from '$domains';
	import { fetchNextPosts } from '$utils';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { globalConfig } from '$utils';
	// lastPostID -> The ID of the last Post -> is needed to load the next posts
	let lastPostID: string = '0';
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
			const data = await fetchNextPosts(lastPostID, globalConfig.limit, 'personal');
			posts = posts.concat(data.posts);
			lastPage = posts.length === data.overallRecords;
			lastPostID = data.lastPostId;
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

<h1 class="h1">
	<span
		class="bg-gradient-to-br from-primary-900 to-primary-600 dark:from-primary-500 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone"
		>PERSÖNLICHER FEED</span
	>
</h1>
<!-- Separator Line -->
<hr class="!border-t-8 !border-double" />
<Posts {posts} {loadMorePosts} {lastPage}></Posts>

<style>
	/* Definition of CSS variables for recurring values */
	:root {
		--default-margin: 2rem; /* Default outer margin */
		--default-font-size-large: 3rem; /* Default size for large text */
	}

	/* Styles for h1 elements */
	.h1 {
		font-size: var(--default-font-size-large);
		text-align: center;
		margin-top: var(--default-margin);
		margin-bottom: var(--default-margin);
		transition: transform 0.3s ease-in-out; /* Transition effect for mouse hover */
	}

	.h1:hover {
		transform: scale(1.1); /* Enlarge on hover */
	}

	/* Styles for horizontal lines (hr) */
	hr {
		margin-top: var(--default-margin);
		margin-bottom: var(--default-margin);
	}

	/* Media Query for small screens (e.g., mobile phones) */
	@media (max-width: 40rem) {
		:root {
			--default-font-size-large: 2rem; /* Smaller text size for mobile devices */
		}

		.h1 {
			font-size: 2rem; /* Smaller text size for headings */
		}
	}
</style>
