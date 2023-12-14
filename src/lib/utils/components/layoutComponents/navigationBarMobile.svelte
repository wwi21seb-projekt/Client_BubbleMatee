<script lang="ts">
	import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { isLoggedIn } from '$lib/stores/store';
	import { Check } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<hr class="!border-t-1" />
<TabGroup
	flex="flex-1 lg:flex-none"
	active=""
>
	{#if $isLoggedIn === false}
		<TabAnchor href="/about" selected={$page.url.pathname === '/about'}>
			<svelte:fragment slot="lead">
				<Icon src={Check} class="w-6 h-6" />
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
		<TabAnchor href="/" selected={$page.url.pathname === '/'} title=AAA>
			<svelte:fragment slot="lead">
				<Icon src={Check} class="mx-auto text-black hover:text-white" />
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
