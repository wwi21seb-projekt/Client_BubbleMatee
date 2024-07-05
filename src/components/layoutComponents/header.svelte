<script lang="ts">
	import { page } from '$app/stores';
	import { Settings } from '$components';
	import { Logo, Text } from '$images';
	import { AppBar, LightSwitch, modeCurrent, setModeUserPrefers } from '@skeletonlabs/skeleton';
	import NotificationButton from '$components/notifications/notification-button.svelte';
	import ChatButton from '$components/chats/chat-button.svelte';
	import { isLoggedIn } from '$stores';

	const handleLightSwitch = () => {
		setModeUserPrefers($modeCurrent);
	};

	$: chatDisabled = $page.url.pathname.includes('chats');
	$: notificationDisabled = $page.url.pathname.includes('notifications');
	$: settingsDisabled = $page.url.pathname.includes('settings');
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
		{#if $isLoggedIn}
			<NotificationButton disabled={notificationDisabled} />
			<ChatButton disabled={chatDisabled} />
			<Settings disabled={settingsDisabled} />
		{/if}
	</svelte:fragment>
</AppBar>
