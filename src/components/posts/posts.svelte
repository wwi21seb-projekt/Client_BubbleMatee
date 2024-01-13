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
		<!-- Button to load the next posts - is invisible, if there are no more posts-->
		{#if !lastPage}
			<div class=" m-4">
				<button
					class="mb-2 w-full rounded-t-md rounded-b-[20px] flex flex-col items-center bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600
  				dark:hover:from-tertiary-600 dark:hover:to-secondary-600 hover:from-primary-500 hover:to-primary-700 focus:outline-none focus:ring focus:border-primary-300
  				dark:focus:from-tertiary-600 dark:focus:to-secondary-600 focus:from-primary-5000 focus:to-primary-700"
					on:click={loadMorePosts}
				>
					<span class="font-bold text-lg"> Mehr Laden </span>
					<Icon src={ChevronDown} class="h-8 font-bold" />
				</button>
			</div>
		{/if}
	</div>
</div>
