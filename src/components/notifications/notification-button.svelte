<script lang="ts">
	import { Bell } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { notifications } from '$stores';
	import { goto } from '$app/navigation';

	const handleClick = () => {
		goto('/home/notifications');
	};
</script>

<button on:click={handleClick} class="relative inline-block">
	<span class="badge-icon variant-filled-warning absolute -top-0 -right-0 z-10"
		>{$notifications.length}</span
	>
	<Icon src={Bell} class="h-8 md:h-10 font-bold hover:stroke-gray-400" />
</button>
