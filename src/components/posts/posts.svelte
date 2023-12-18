<!-- List component that contains multiple posts.  -->
<script lang="ts">
	//TODO: Anpassen an Interface
	export let data: [];
	export let loadData: () => void;
	import { PostCard } from '$components';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronDown } from '@steeze-ui/heroicons';
</script>

<div class="flex w-full justify-center items-center">
	<!--Switch the width on different devices-->
	<div class="w-full sm:w-3/4 md:w-full lg:w-3/4">
		{#each data as d}
			<PostCard imageUrl={d.imageUrl} text={d.text}></PostCard>
		{/each}

		<!-- Button to load the next posts -->
		<button
			class="mb-2 w-full rounded-t-md rounded-b-[20px] flex flex-col items-center bg-gradient-to-br from-tertiary-700 to-secondary-700
  hover:bg-gradient-to-br hover:from-tertiary-800 hover:to-secondary-800 focus:outline-none focus:ring focus:border-blue-300
  focus:bg-gradient-to-br focus:from-tertiary-800 focus:to-secondary-800"
			on:click={loadData}
		>
			<span class="font-bold text-lg"> Mehr Laden </span>
			<Icon src={ChevronDown} class="h-8 font-bold" />
		</button>
	</div>
</div>
