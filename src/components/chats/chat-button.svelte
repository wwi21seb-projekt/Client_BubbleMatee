<script lang="ts">
	import { PaperAirplane } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { goto } from '$app/navigation';
	import { notifications } from '$stores';

	$: messageNotifications = $notifications.filter(
		(notification) => notification.notificationType === 'message'
	);

	const handleClick = () => {
		goto('/home/chats');
	};
</script>

<button on:click={handleClick} class="relative inline-block">
	{#if messageNotifications.length > 0}
		<span class="badge-icon variant-filled-warning absolute -top-0 -right-0 z-10"
			>{messageNotifications.length}</span
		>
	{/if}
	<Icon src={PaperAirplane} class="h-8 md:h-10 font-bold hover:stroke-gray-400" />
</button>
