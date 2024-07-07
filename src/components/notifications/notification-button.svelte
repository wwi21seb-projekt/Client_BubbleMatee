<script lang="ts">
	import { Bell } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { notifications } from '$stores';
	import { goto } from '$app/navigation';

	export let disabled: boolean = false;

	const handleClick = () => {
		goto('/notifications');
	};
	$: nonMessageNotifications = $notifications.filter(
		(notification) => notification.notificationType !== 'message'
	);
</script>

<button
	on:click={handleClick}
	class="relative inline-block {disabled ? 'disabled' : ''}"
	{disabled}
>
	{#if nonMessageNotifications.length > 0}
		<span class="badge-icon variant-filled-warning absolute -top-0 -right-0 z-10"
			>{nonMessageNotifications.length}</span
		>
	{/if}
	<Icon
		src={Bell}
		class="h-8 md:h-10 font-bold hover:stroke-gray-400 {disabled ? 'stroke-gray-400' : ''}"
	/>
</button>
