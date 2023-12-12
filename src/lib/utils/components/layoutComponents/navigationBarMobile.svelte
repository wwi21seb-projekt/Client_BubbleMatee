<script lang="ts">
	import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { isLoggedIn } from '$lib/stores/store';
</script>

<TabGroup
	justify="justify-center"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded="rounded-tl-container-token rounded-br-container-token rounded-tr-container-token rounded-bl-container-token"
	border=""
	class="bg-surface-100-800-token w-full"
>
	{#if $isLoggedIn === false}
		<TabAnchor href="/about" selected={$page.url.pathname === '/about'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto" src="/favicon.png" alt="About Us" />
			</svelte:fragment>
		</TabAnchor>
		<TabAnchor href="/search" selected={$page.url.pathname === '/search'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto" src="/favicon.png" alt="Suche" />
			</svelte:fragment>
		</TabAnchor>
		<TabAnchor href="/login" selected={$page.url.pathname === '/login'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto" src="/favicon.png" alt="Login" />
			</svelte:fragment>
		</TabAnchor>
	{:else}
		<TabAnchor href="/" selected={$page.url.pathname === '/'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto" src="/favicon.png" alt="Home" />
			</svelte:fragment>
		</TabAnchor>
		<TabAnchor href="/search" selected={$page.url.pathname === '/search'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto" src="/favicon.png" alt="Suche" />
			</svelte:fragment>
		</TabAnchor>
		<TabAnchor href="/post" selected={$page.url.pathname === '/post'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto" src="/favicon.png" alt="Posten" />
			</svelte:fragment>
		</TabAnchor>
		<TabAnchor href="/about" selected={$page.url.pathname === '/about'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto" src="/favicon.png" alt="About	Us" />
			</svelte:fragment>
		</TabAnchor>
		<TabAnchor href="/profile" selected={$page.url.pathname === '/profile'}>
			<svelte:fragment slot="lead">
				<img class="mx-auto" src="/favicon.png" alt="Mein Profil" />
			</svelte:fragment>
		</TabAnchor>
	{/if}
</TabGroup>
