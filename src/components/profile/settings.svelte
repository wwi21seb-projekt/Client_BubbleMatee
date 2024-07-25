<script lang="ts">
	import { goto } from '$app/navigation';
	import { Cog6Tooth } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let disabled: boolean = false;

	const handleClick: () => void = () => {
		goto('/settings');
	};
</script>

<button on:click={handleClick} class={disabled ? 'disabled' : ''} {disabled}>
	<Icon
		src={Cog6Tooth}
		class="h-8 md:h-10 font-bold hover:stroke-gray-400 {disabled ? 'stroke-gray-400' : ''}"
	/>
</button>
