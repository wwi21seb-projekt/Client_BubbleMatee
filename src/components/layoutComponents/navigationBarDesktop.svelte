<script lang="ts">
	import { page } from '$app/stores';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { isLoggedIn } from '$stores';
</script>

<AppRail>
	{#if $isLoggedIn === false}
		<AppRailAnchor href="/about" selected={$page.url.pathname === '/about'}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>About</span>
		</AppRailAnchor>
		<AppRailAnchor href="/search" selected={$page.url.pathname === '/search'}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>Search</span>
		</AppRailAnchor>
		<AppRailAnchor href="/login" selected={$page.url.pathname === '/login'}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>Login</span>
		</AppRailAnchor>
	{:else}
		<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>Home</span>
		</AppRailAnchor>
		<AppRailAnchor href="/search" selected={$page.url.pathname === '/search'}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>Search</span>
		</AppRailAnchor>
		<AppRailAnchor href="/post" selected={$page.url.pathname === '/post'}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>Post</span>
		</AppRailAnchor>
		<AppRailAnchor href="/about" selected={$page.url.pathname === '/about'}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>About</span>
		</AppRailAnchor>
		<AppRailAnchor href="/profile" selected={$page.url.pathname === '/profile'}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>My Profile</span>
		</AppRailAnchor>
	{/if}
</AppRail>
