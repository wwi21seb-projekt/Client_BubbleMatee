<script lang="ts">
	import type { Error, PostData } from '$domains';
	import { Feed } from '$components';
	import { getErrorMessage } from '$utils';
	export let postData: PostData;
	export let isError: boolean;
	export let loadMore: () => Promise<void>;
	export let error: Error;
</script>

{#if !isError}
	<Feed
		classString={'w-full'}
		{postData}
		loadMorePosts={loadMore}
		nothingFoundMessage={'Keine passenden Post gefunden'}
		nothingFoundSubMessage={'Sei der erste, der diesen Hashtag verwendet!'}
	/>
{:else if error}
	<p>{getErrorMessage(error.code, true)}</p>
{:else}
	<p>Es ist ein Fehler aufgetreten</p>
{/if}
