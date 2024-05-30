<script lang="ts">
	import { page } from '$app/stores';
	import { Settings } from '$components';
	import { Logo, Text } from '$images';
	import { AppBar, LightSwitch, modeCurrent, setModeUserPrefers } from '@skeletonlabs/skeleton';
	import NotificationButton from '$components/notifications/notification-button.svelte';
	import ChatButton from '$components/chats/chat-button.svelte';
	import { subscribe, sendMessage, storeMessage } from '$stores';

	const handleLightSwitch = () => {
		setModeUserPrefers($modeCurrent);
	};
	interface Message {
		nickname: string;
		message: string;
	}

	let message: string = 'Hallo';

	function onSendMessage(): void {
		if (message && message.length > 0) {
			storeMessage(message);
			sendMessage(message);
			message += '1';
		}
	}
	let messages: Array<string> = [];
</script>

<!-- App Shell -->
<AppBar padding="p-1">
	<svelte:fragment slot="lead">
		<div class="flex items-center">
			<img class="h-10 md:h-20 self-center" src={Logo} alt="BubbleMateLogo" />
			<img class="h-12 md:h-20 self-center" src={Text} alt="BubbleMateLogo" />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch on:click={handleLightSwitch} />
		<button
			on:click={() => {
				console.log('WebSocket');
				subscribe((currentMessage) => {
					messages = [...messages, currentMessage];
				});
			}}>WebSocket</button
		>
		<button
			on:click={() => {
				onSendMessage();
			}}>Senden</button
		>
		{#if $page.url.pathname === '/myProfile'}
			<Settings />
		{:else if $page.url.pathname === '/home'}
			<NotificationButton />
			<ChatButton />
		{/if}
	</svelte:fragment>
</AppBar>
