<script lang="ts">
	import { page } from '$app/stores';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { isLoggedIn } from '$lib/stores/store';
</script>

<AppRail>
	{#if $isLoggedIn === false}
		<AppRailAnchor href="/about" selected={$page.url.pathname === '/about'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto" src="/favicon.png" alt="About Us" />
			</svelte:fragment>
		</AppRailAnchor>
		<AppRailAnchor href="/search" selected={$page.url.pathname === '/search'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto" src="/favicon.png" alt="Suche" />
			</svelte:fragment>			
		</AppRailAnchor>
		<AppRailAnchor href="/login" selected={$page.url.pathname === '/login'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto" src="/favicon.png" alt="Login" />
			</svelte:fragment>
		</AppRailAnchor>
	{:else}
		<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto hover:invert" src="/src/images/layout/home.png" alt="Login" />
			</svelte:fragment>
		</AppRailAnchor>
		<AppRailAnchor href="/search" selected={$page.url.pathname === '/search'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto" src="/favicon.png" alt="Suche" />
			</svelte:fragment>
		</AppRailAnchor>
		<AppRailAnchor href="/post" selected={$page.url.pathname === '/post'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto" src="/favicon.png" alt="Posten" />
			</svelte:fragment>
		</AppRailAnchor>
		<AppRailAnchor href="/about" selected={$page.url.pathname === '/about'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto" src="/favicon.png" alt="About	Us" />
			</svelte:fragment>
		</AppRailAnchor>
		<AppRailAnchor href="/profile" selected={$page.url.pathname === '/profile'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto" src="/favicon.png" alt="Mein Profil" />
			</svelte:fragment>
		</AppRailAnchor>
	{/if}
</AppRail>
