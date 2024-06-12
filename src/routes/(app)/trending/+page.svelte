<script lang="ts">
	import { Feed } from '$components';
	import type { ErrorObject, PostData, PostWithRepost } from '$domains';
	import { fetchNextPostsFeed, getErrorMessage } from '$utils';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { globalConfig } from '$utils';
	import { loading } from '$stores';
	export let data: PostData | ErrorObject;
	let postData: PostData = {
		posts: new Array<PostWithRepost>(),
		overallRecords: 0,
		lastPostId: ''
	};
	handleLoadResult(data);
	const toastStore = getToastStore();

	function handleLoadResult(data: PostData | ErrorObject): void {
		if ('posts' in data) {
			postData.posts = postData.posts.concat(data.posts);
			postData.overallRecords = data.overallRecords;
			postData.lastPostId = data.lastPostId!;
		} else {
			const t: ToastSettings = {
				message: getErrorMessage(data.error.code, false),
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		}
	}

	//function that can be called from the post component to trigger the loading of more posts
	async function loadMorePosts() {
		$loading = true;
		const data: PostData | ErrorObject = await fetchNextPostsFeed(
			postData.lastPostId!,
			globalConfig.limit,
			'global'
		);
		handleLoadResult(data);
		$loading = false;
	}
</script>

<h1 class="h1 flex justify-center m-4">
	<span
		class="bg-gradient-to-br from-primary-900 to-primary-600 dark:from-primary-500 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone"
		>TRENDING POSTS</span
	>
</h1>
<!-- Separator Line -->
<hr class="!border-t-8 !border-double" />

<Feed
	{postData}
	{loadMorePosts}
	nothingFoundMessage={'Keine Post gefunden'}
	nothingFoundSubMessage={'Sei der erste, der einen Post auf dieser Plattform verfasst!'}
></Feed>

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
