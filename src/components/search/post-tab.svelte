<script lang="ts">
	import type { Error, Post } from '$domains';
	import { Feed } from '$components';
	import { getErrorMessage } from '$utils';

	export let posts: Array<Post>;
	export let isError: boolean;
	export let error: Error;
	export let loadMore: () => void;
	export let lastPage: boolean;
</script>

{#if !isError}
	<Feed classString={'w-full'} {posts} loadMorePosts={loadMore} {lastPage} />
{:else if error}
	<p>{getErrorMessage(error.code)}</p>
{:else}
	<p>Es ist ein Fehler aufgetreten</p>
{/if}
