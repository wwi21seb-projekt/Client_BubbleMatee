<script lang="ts">
	import '../app.postcss';
	import { AppShell, Toast, Modal } from '@skeletonlabs/skeleton';
	import { Header, NavigationBarMobile, NavigationBarDesktop } from '$components';
	import { initializeStores, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	// import { pwaInfo } from 'virtual:pwa-info';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	// $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';
	initializeStores();
</script>

<!-- <svelte:head>
	{@html webManifestLink}
</svelte:head> -->

<Modal transitions={false} />
<Toast position="t" />
<!-- Basic Layout of the App -->
<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<!-- If the App is rendered on a mobile device, the navigation Bar is displayed on the bottom, otherwise on the left sidebar  -->
	<svelte:fragment slot="footer">
		<div class="md:hidden">
			<NavigationBarMobile />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<div class="hidden md:flex h-full">
			<NavigationBarDesktop />
		</div>
	</svelte:fragment>
	<slot />
</AppShell>
