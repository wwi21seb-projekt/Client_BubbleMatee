<!-- List component that contains multiple posts.  -->
<script lang="ts">
	export let posts: Array<Post>;
	export let loadMorePosts: () => void;
	export let lastPage: boolean;
	import { PostCard } from '$components';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronDown } from '@steeze-ui/heroicons';
	import type { Post } from '$domains';
</script>

<div class="flex w-full justify-center items-center">
	<!--Switch the width on different devices-->
	<div class="w-full sm:w-3/4 md:w-full lg:w-3/4">
		{#if posts}
			{#each posts as post}
				<PostCard {post}></PostCard>
			{/each}
		{/if}
		{#if !lastPage}
			<!-- Button to load the next posts -->
			<button
				class="mb-2 w-full rounded-t-md rounded-b-[20px] flex flex-col items-center bg-gradient-to-br from-tertiary-700 to-secondary-700
  hover:bg-gradient-to-br hover:from-tertiary-800 hover:to-secondary-800 focus:outline-none focus:ring focus:border-blue-300
  focus:bg-gradient-to-br focus:from-tertiary-800 focus:to-secondary-800"
				on:click={loadMorePosts}
			>
				<span class="font-bold text-lg"> Mehr Laden </span>
				<Icon src={ChevronDown} class="h-8 font-bold" />
			</button>
		{/if}
	</div>
</div>
