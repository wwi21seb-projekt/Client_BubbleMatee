<script lang="ts">
	import { PaperAirplane } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { goto } from '$app/navigation';

	const handleClick = () => {
		goto('/home/chats');
	};
</script>

<button on:click={handleClick} class="relative inline-block">
	<Icon src={PaperAirplane} class="h-8 md:h-10 font-bold hover:stroke-gray-400" />
</button>
