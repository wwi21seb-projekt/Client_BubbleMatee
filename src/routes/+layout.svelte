<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Header from '$lib/utils/components/layoutComponents/header.svelte';
	import NavigationBarMobile from '$lib/utils/components/layoutComponents/navigationBarMobile.svelte';
	import NavigationBarDesktop from '$lib/utils/components/layoutComponents/navigationBarDesktop.svelte';
</script>

<!-- Basic Layout of the App -->
<AppShell>
	<svelte:fragment slot="header">
		<Header></Header>
	</svelte:fragment>
	<!-- If the App is rendered on a mobile device, the navigation Bar is displayed on the bottom, otherwise on the left sidebar  -->
	<svelte:fragment slot="footer">
		<div class="md:hidden">
			<NavigationBarMobile></NavigationBarMobile>
	</div>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<div class="hidden md:flex h-full">
			<NavigationBarDesktop></NavigationBarDesktop>
		</div>
	</svelte:fragment>
	<slot />
</AppShell>
