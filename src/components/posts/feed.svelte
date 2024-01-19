<!-- List component that contains multiple posts.  -->
<script lang="ts">
	export let posts: Array<Post>;
	export let loadMorePosts: () => void;
	export let lastPage: boolean;
	import { LoadMoreComponent, FeedPostCard } from '$components';
	import type { Post } from '$domains';
</script>

<div class="flex w-full justify-center items-center">
	<!--Switch the width on different devices-->
	<div class="w-full sm:w-3/4 md:w-full lg:w-3/4">
		{#if posts}
			{#each posts as post}
				<FeedPostCard {post}></FeedPostCard>
			{/each}
		{/if}
		<!-- Button to load the next posts - is invisible, if there are no more posts-->
		{#if !lastPage}
			<div class=" m-4">
				<LoadMoreComponent loadMore={loadMorePosts} />
			</div>
		{/if}
	</div>
</div>
