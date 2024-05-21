<script lang="ts">
	import { page } from '$app/stores';
	import { Settings } from '$components';
	import { Logo, Text } from '$images';
	import { AppBar, LightSwitch, modeCurrent, setModeUserPrefers } from '@skeletonlabs/skeleton';
	import NotificationButton from '$components/notifications/notification-button.svelte';

	const handleLightSwitch = () => {
		setModeUserPrefers($modeCurrent);
	};
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
		{#if $page.url.pathname === '/myProfile'}
			<Settings />
		{:else if $page.url.pathname === '/home'}
			<NotificationButton />
		{/if}
	</svelte:fragment>
</AppBar>
