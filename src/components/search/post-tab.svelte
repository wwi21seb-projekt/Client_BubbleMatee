<script lang="ts">
	import type { Error, Post, PostWithRepost } from '$domains';
	import { Feed } from '$components';
	import { getErrorMessage } from '$utils';

	export let posts: Array<PostWithRepost>;
	export let isError: boolean;
	export let loadMore: () => Promise<void>;
	export let error: Error;
	export let lastPage: boolean;
</script>

{#if !isError}
	<Feed
		classString={'w-full'}
		{posts}
		loadMorePosts={loadMore}
		{lastPage}
		nothingFoundMessage={'Keine passenden Post gefunden'}
		nothingFoundSubMessage={'Sei der erste, der diesen Hashtag verwendet!'}
	/>
{:else if error}
	<p>{getErrorMessage(error.code, false)}</p>
{:else}
	<p>Es ist ein Fehler aufgetreten</p>
{/if}
