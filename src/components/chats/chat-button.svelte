<script lang="ts">
	import { PaperAirplane } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { goto } from '$app/navigation';
	import { notifications } from '$stores';

	$: messageNotificationUsers = new Set(
		$notifications
			.filter((notification) => notification.notificationType === 'message')
			.map((notification) => notification.user.username)
	);
	$: messageNotificationLength = messageNotificationUsers.size;

	const handleClick = () => {
		goto('/home/chats');
	};
</script>

<button on:click={handleClick} class="relative inline-block">
	{#if messageNotificationLength > 0}
		<span class="badge-icon variant-filled-warning absolute -top-0 -right-0 z-10"
			>{messageNotificationLength}</span
		>
	{/if}
	<Icon src={PaperAirplane} class="h-8 md:h-10 font-bold hover:stroke-gray-400" />
</button>
