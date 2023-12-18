<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowLeft } from '@steeze-ui/heroicons';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const leave = () => {
		modalStore.close();
	};
	const modalStore = getModalStore();
</script>

<div class="flex">
	<button on:click={leave} class="focus:outline-none">
		<Icon src={ArrowLeft} class="h-8 font-bold hover:stroke-gray-400" />
	</button>
	<h1 class="flex items-center text-2xl pl-2">Kommentare</h1>
</div>
