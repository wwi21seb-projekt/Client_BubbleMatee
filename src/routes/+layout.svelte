<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { isMobileDevice } from '$stores';
	import { Header, NavigationBarMobile, NavigationBarDesktop } from '$components';
	// Check wether the app is rendered on a mobile device or not.
	// The Information is stored in $lib/stores/store and can be refferenced from everywhere
	onMount(() => {
		$isMobileDevice = window.innerWidth <= 750;
	});
</script>

<!-- Basic Layout of the App -->
<AppShell>
	<svelte:fragment slot="header">
		<Header></Header>
	</svelte:fragment>
	<!-- If the App is rendered on a mobile device, the navigation Bar is displayed on the bottom, otherwise on the left sidebar  -->
	<svelte:fragment slot="footer">
		{#if $isMobileDevice}
			<NavigationBarMobile></NavigationBarMobile>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		{#if $isMobileDevice === false}
			<NavigationBarDesktop></NavigationBarDesktop>
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>
