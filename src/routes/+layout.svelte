<script lang="ts">
	import '../app.postcss';
	import { AppShell, Toast } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { isMobileDevice } from '$stores';
	import { Header, NavigationBarMobile, NavigationBarDesktop } from '$components';

	import { initializeStores, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();
	// Check wether the app is rendered on a mobile device or not.
	// The Information is stored in $lib/stores/store and can be refferenced from everywhere
	onMount(() => {
		$isMobileDevice = window.innerWidth <= 750;
	});
</script>

<Toast position="t" />

<!-- <AppShell>...</AppShell> -->
<!-- Basic Layout of the App -->
<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<!-- If the App is rendered on a mobile device, the navigation Bar is displayed on the bottom, otherwise on the left sidebar  -->
	<svelte:fragment slot="footer">
		{#if $isMobileDevice}
			<NavigationBarMobile />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		{#if $isMobileDevice === false}
			<NavigationBarDesktop />
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>
