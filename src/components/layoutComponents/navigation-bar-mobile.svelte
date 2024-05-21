<script lang="ts">
	import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { isLoggedIn } from '$stores';
	import {
		Home,
		MagnifyingGlass,
		PlusCircle,
		InformationCircle,
		UserCircle,
		ArrowRightEndOnRectangle
	} from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { hasNotifications } from '$stores';
</script>

<hr class="!border-t-1" />
<TabGroup flex="flex-1 lg:flex-none" active="">
	{#if $isLoggedIn}
		<TabAnchor href="/home">
			<svelte:fragment slot="lead">
				<div class="relative inline-block flex flex-col items-center">
					<Icon
						src={Home}
						class={'mx-auto h-10' +
							($page.url.pathname.startsWith('/home')
								? ' text-secondary-500 dark:text-primary-500 stroke-2'
								: ' text-primary-900 dark:text-primary-100 stroke-1') +
							' hover:text-secondary-500 hover:dark:text-primary-500  hover:stroke-2'}
					/>
					{#if $hasNotifications && !$page.url.pathname.startsWith('/home')}
						<span
							class="badge-icon variant-filled-warning absolute bottom-[-5px] text-[0.1rem] z-10 w-[7px] h-[7px]"
						></span>
					{/if}
				</div>
			</svelte:fragment>
		</TabAnchor>
		<hr class="!border-t-1" />
		<TabAnchor href="/search">
			<svelte:fragment slot="lead">
				<Icon
					src={MagnifyingGlass}
					class={'mx-auto h-10' +
						($page.url.pathname.startsWith('/search')
							? ' text-secondary-500 dark:text-primary-500 stroke-2'
							: ' text-primary-900 dark:text-primary-100 stroke-1') +
						' hover:text-secondary-500 hover:dark:text-primary-500  hover:stroke-2'}
				/>
			</svelte:fragment>
		</TabAnchor>
		<hr class="!border-t-1" />
	{:else}
		<TabAnchor href="/trending">
			<svelte:fragment slot="lead">
				<Icon
					src={MagnifyingGlass}
					class={'mx-auto h-10' +
						($page.url.pathname.startsWith('/trending')
							? ' text-secondary-500 dark:text-primary-500 stroke-2'
							: ' text-primary-900 dark:text-primary-100 stroke-1') +
						' hover:text-secondary-500 hover:dark:text-primary-500  hover:stroke-2'}
				/>
			</svelte:fragment>
		</TabAnchor>
	{/if}
	<hr class="!border-t-1" />
	{#if $isLoggedIn}
		<TabAnchor href="/post">
			<svelte:fragment slot="lead">
				<Icon
					src={PlusCircle}
					class={'mx-auto h-10 ' +
						($page.url.pathname.startsWith('/post')
							? ' text-secondary-500 dark:text-primary-500 stroke-2'
							: ' text-primary-900 dark:text-primary-100 stroke-1') +
						' hover:text-secondary-500 hover:dark:text-primary-500  hover:stroke-2'}
				/>
			</svelte:fragment>
		</TabAnchor>
		<hr class="!border-t-1" />
	{/if}
	<TabAnchor href="/about">
		<svelte:fragment slot="lead">
			<Icon
				src={InformationCircle}
				class={'mx-auto h-10 ' +
					($page.url.pathname.startsWith('/about')
						? ' text-secondary-500 dark:text-primary-500 stroke-2'
						: ' text-primary-900 dark:text-primary-100 stroke-1') +
					' hover:text-secondary-500 hover:dark:text-primary-500  hover:stroke-2'}
			/>
		</svelte:fragment>
	</TabAnchor>
	<hr class="!border-t-1" />
	{#if $isLoggedIn === false}
		<TabAnchor href="/login">
			<svelte:fragment slot="lead">
				<Icon
					src={ArrowRightEndOnRectangle}
					class={'mx-auto h-10 ' +
						($page.url.pathname.startsWith('/login')
							? ' text-secondary-500 dark:text-primary-500 stroke-2'
							: ' text-primary-900 dark:text-primary-100 stroke-1') +
						' hover:text-secondary-500 hover:dark:text-primary-500  hover:stroke-2'}
				/>
			</svelte:fragment>
		</TabAnchor>
		<hr class="!border-t-1" />
	{:else}
		<TabAnchor href="/myProfile" s>
			<svelte:fragment slot="lead">
				<Icon
					src={UserCircle}
					class={'mx-auto h-10 ' +
						($page.url.pathname.startsWith('/myProfile')
							? ' text-secondary-500 dark:text-primary-500 stroke-2'
							: ' text-primary-900 dark:text-primary-100 stroke-1') +
						' hover:text-secondary-500 hover:dark:text-primary-500  hover:stroke-2'}
				/>
			</svelte:fragment>
		</TabAnchor>
	{/if}
</TabGroup>
