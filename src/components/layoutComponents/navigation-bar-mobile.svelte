<script lang="ts">
	import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { isLoggedIn } from '$stores';
	import { t } from '../../i18n.ts';
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
			<span>{$t('layout.about')}</span>
		</TabAnchor>
		<TabAnchor href="/search" selected={$page.url.pathname.startsWith('/search')}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>{$t('layout.search')}</span>
		</TabAnchor>
		<TabAnchor href="/login" selected={$page.url.pathname.startsWith('/login')}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>{$t('layout.login')}</span>
		</TabAnchor>
	{:else}
		<TabAnchor href="/" selected={$page.url.pathname.startsWith('/home')}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>{$t('layout.home')}</span>
		</TabAnchor>
		<TabAnchor href="/search" selected={$page.url.pathname.startsWith('/search')}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>{$t('layout.home')}</span>
		</TabAnchor>
		<TabAnchor href="/post" selected={$page.url.pathname.startsWith('/post')}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>{$t('layout.post')}</span>
		</TabAnchor>
		<TabAnchor href="/about" selected={$page.url.pathname.startsWith('/about')}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>{$t('layout.about')}</span>
		</TabAnchor>
		<TabAnchor href="/myProfile" selected={$page.url.pathname.startsWith('/myProfile')}>
			<svelte:fragment slot="lead">
				<img src="/favicon.png" alt="Icon" />
			</svelte:fragment>
			<span>{$t('layout.myProfile')}</span>
		</TabAnchor>
	{/if}
</TabGroup>
