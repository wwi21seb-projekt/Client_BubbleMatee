<script lang="ts">
	import { page } from '$app/stores';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { isLoggedIn } from '$stores';
	import {
		Home,
		MagnifyingGlass,
		PlusCircle,
		InformationCircle,
		UserCircle,
		ArrowRightOnRectangle
	} from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<AppRail class="p-1" hover="" active="" width="w-16">
	{#if $isLoggedIn}
		<AppRailAnchor class="mt-20" href="/home">
			<svelte:fragment slot="lead">
				<Icon
					src={Home}
					class={'mx-auto' +
						($page.url.pathname.startsWith('/home')
							? ' text-secondary-500 dark:text-primary-500 stroke-2'
							: ' text-primary-900 dark:text-primary-100 stroke-1') +
						' hover:text-secondary-500 hover:dark:text-primary-500 hover:stroke-2'}
				/>
			</svelte:fragment>
			<span
				class={'' +
					($page.url.pathname.startsWith('/home')
						? ' text-secondary-500 dark:text-primary-500 stroke-2'
						: ' text-primary-900 dark:text-primary-100 stroke-1') +
					' hover:text-secondary-500 hover:dark:text-primary-500 hover:stroke-2'}>Home</span
			>
		</AppRailAnchor>
		<hr class="!border-t-1" />
		<AppRailAnchor href="/search">
			<svelte:fragment slot="lead">
				<Icon
					src={MagnifyingGlass}
					class={'mx-auto ' +
						($page.url.pathname.startsWith('/search')
							? ' text-secondary-500 dark:text-primary-500 stroke-2'
							: ' text-primary-900 dark:text-primary-100 stroke-1') +
						' hover:text-secondary-500 hover:dark:text-primary-500 hover:stroke-2'}
				/>
			</svelte:fragment>
			<span
				class={'' +
					($page.url.pathname.startsWith('/search')
						? ' text-secondary-500 dark:text-primary-500 stroke-2'
						: ' text-primary-900 dark:text-primary-100 stroke-1') +
					' hover:text-secondary-500 hover:dark:text-primary-500 hover:stroke-2'}>Suchen</span
			>
		</AppRailAnchor>
		<hr class="!border-t-1" />
	{:else}
		<AppRailAnchor href="/trending">
			<svelte:fragment slot="lead">
				<Icon
					src={MagnifyingGlass}
					class={'mx-auto ' +
						($page.url.pathname.startsWith('/trending')
							? ' text-secondary-500 dark:text-primary-500 stroke-2'
							: ' text-primary-900 dark:text-primary-100 stroke-1') +
						' hover:text-secondary-500 hover:dark:text-primary-500 hover:stroke-2'}
				/>
			</svelte:fragment>
			<span
				class={'' +
					($page.url.pathname.startsWith('/trending')
						? ' text-secondary-500 dark:text-primary-500 stroke-2'
						: ' text-primary-900 dark:text-primary-100 stroke-1') +
					' hover:text-secondary-500 hover:dark:text-primary-500 hover:stroke-2'}>Trends</span
			>
		</AppRailAnchor>
		<hr class="!border-t-1" />
	{/if}
	{#if $isLoggedIn}
		<AppRailAnchor href="/post">
			<svelte:fragment slot="lead">
				<Icon
					src={PlusCircle}
					class={'mx-auto ' +
						($page.url.pathname.startsWith('/post')
							? ' text-secondary-500 dark:text-primary-500 stroke-2'
							: ' text-primary-900 dark:text-primary-100 stroke-1') +
						' hover:text-secondary-500 hover:dark:text-primary-500 hover:stroke-2'}
				/>
			</svelte:fragment>
			<span
				class={'' +
					($page.url.pathname.startsWith('/post')
						? ' text-secondary-500 dark:text-primary-500 stroke-2'
						: ' text-primary-900 dark:text-primary-100 stroke-1') +
					' hover:text-secondary-500 hover:dark:text-primary-500 hover:stroke-2'}
			>
				Posten</span
			>
		</AppRailAnchor>
		<hr class="!border-t-1" />
	{/if}
	<AppRailAnchor href="/about">
		<svelte:fragment slot="lead">
			<Icon
				src={InformationCircle}
				class={'mx-auto ' +
					($page.url.pathname.startsWith('/about')
						? ' text-secondary-500 dark:text-primary-500 stroke-2'
						: ' text-primary-900 dark:text-primary-100 stroke-1') +
					' hover:text-secondary-500 hover:dark:text-primary-500 hover:stroke-2'}
			/>
		</svelte:fragment>
		<span
			class={'' +
				($page.url.pathname.startsWith('/about')
					? ' text-secondary-500 dark:text-primary-500 stroke-2'
					: ' text-primary-900 dark:text-primary-100 stroke-1') +
				' hover:text-secondary-500 hover:dark:text-primary-500 hover:stroke-2'}>About us</span
		>
	</AppRailAnchor>
	<hr class="!border-t-1" />
	{#if $isLoggedIn === false}
		<AppRailAnchor href="/login">
			<svelte:fragment slot="lead">
				<Icon
					src={ArrowRightOnRectangle}
					class={'mx-auto ' +
						($page.url.pathname.startsWith('/login')
							? ' text-secondary-500 dark:text-primary-500 stroke-2'
							: ' text-primary-900 dark:text-primary-100 stroke-1') +
						' hover:text-secondary-500 hover:dark:text-primary-500 hover:stroke-2'}
				/>
			</svelte:fragment>
			<span
				class={'' +
					($page.url.pathname.startsWith('/login')
						? ' text-secondary-500 dark:text-primary-500 stroke-2'
						: ' text-primary-900 dark:text-primary-100 stroke-1') +
					' hover:text-secondary-500 hover:dark:text-primary-500 hover:stroke-2'}>Anmelden</span
			>
		</AppRailAnchor>
		<hr class="!border-t-1" />
	{:else}
		<AppRailAnchor href="/myProfile">
			<svelte:fragment slot="lead">
				<Icon
					src={UserCircle}
					class={'mx-auto ' +
						($page.url.pathname.startsWith('/myProfile')
							? ' text-secondary-500 dark:text-primary-500 stroke-2'
							: ' text-primary-900 dark:text-primary-100 stroke-1') +
						' hover:text-secondary-500 hover:dark:text-primary-500 hover:stroke-2'}
				/>
			</svelte:fragment>
			<span
				class={'' +
					($page.url.pathname.startsWith('/myProfile')
						? ' text-secondary-500 dark:text-primary-500 stroke-2'
						: ' text-primary-900 dark:text-primary-100 stroke-1') +
					' hover:text-secondary-500 hover:dark:text-primary-500 hover:stroke-2'}
			>
				Mein Profil</span
			>
		</AppRailAnchor>
	{/if}
</AppRail>
