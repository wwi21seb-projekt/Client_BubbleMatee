<script lang="ts">
	import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { isLoggedIn } from '$stores';
</script>

<TabGroup
	justify="justify-center"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded=""
	border=""
	class="bg-surface-100-800-token w-full"
>
	{#if $isLoggedIn === false}
		<TabAnchor href="/about" selected={$page.url.pathname.startsWith('/about')}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>About</span>
		</TabAnchor>
		<TabAnchor href="/search" selected={$page.url.pathname.startsWith('/search')}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>Search</span>
		</TabAnchor>
		<TabAnchor href="/login" selected={$page.url.pathname.startsWith('/login')}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>Login</span>
		</TabAnchor>
	{:else}
		<TabAnchor href="/" selected={$page.url.pathname.startsWith('/home')}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>Home</span>
		</TabAnchor>
		<TabAnchor href="/search" selected={$page.url.pathname.startsWith('/search')}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>Search</span>
		</TabAnchor>
		<TabAnchor href="/post" selected={$page.url.pathname.startsWith('/post')}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>Post</span>
		</TabAnchor>
		<TabAnchor href="/about" selected={$page.url.pathname.startsWith('/about')}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>About</span>
		</TabAnchor>
		<TabAnchor href="/myProfile" selected={$page.url.pathname.startsWith('/myProfile')}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>My Profile</span>
		</TabAnchor>
	{/if}
</TabGroup>
