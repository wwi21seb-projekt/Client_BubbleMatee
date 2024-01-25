<script lang="ts">
	import type { Post } from '$domains';
	import { Feed } from '$components';

	export let posts: Array<Post>;
	export let isError: boolean;
	export let loadMore: () => void;
	export let lastPage: boolean;
</script>

{#if !isError}
	<Feed {posts} loadMorePosts={loadMore} {lastPage} />
{:else}
	<p>Es ist ein Fehler aufgetreten</p>
{/if}
