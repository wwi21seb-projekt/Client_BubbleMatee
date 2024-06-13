<!--Header of the comment modal. Contains a back-button and a headline -->

<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronLeft } from '@steeze-ui/heroicons';
	export let leave: () => void;
	export let title: string = '';
</script>

<div class="flex">
	<button on:click={leave} class="focus:outline-none">
		<Icon src={ChevronLeft} class="h-8 md:h-10 font-bold hover:stroke-gray-400" />
	</button>
	<h1 class="flex items-center text-2xl md:text-3xl pl-2 font-bold">{title}</h1>
</div>
