<script lang="ts">
	import { page } from '$app/stores';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { isLoggedIn } from '$lib/stores/store';
	import { Check } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon'
</script>


<AppRail class="p-1 "
 hover=""
 active=""
 width="w-14"
  >
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
		<AppRailAnchor class="mt-20" href="/" >
			<svelte:fragment slot="lead">
				<Icon src={Check} class={"mx-auto " + ($page.url.pathname === '/' ? " text-primary-500 stroke-2" : " text-white stroke-1") +" hover:text-orange-700  hover:stroke-2" }/>
			</svelte:fragment>
		</AppRailAnchor>
		<AppRailAnchor href="/search" selected={$page.url.pathname === '/search'}>
			<svelte:fragment slot="lead">
				<Icon src={Check} class={"mx-auto " + ($page.url.pathname === '/search' ? " text-primary-500 stroke-2" : " text-white stroke-1") +" hover:text-primary-700  hover:stroke-2" }/>
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
