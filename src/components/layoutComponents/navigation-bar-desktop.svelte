<script lang="ts">
	import { page } from '$app/stores';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { isLoggedIn } from '$stores';
	import { Home, MagnifyingGlass, PlusCircle, InformationCircle, UserCircle, ArrowRightOnRectangle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon' 

</script>


<AppRail class="p-1"
 hover=""
 active=""
 width="w-16">
	{#if $isLoggedIn}
		<AppRailAnchor class="mt-20" href="/home">
		<svelte:fragment slot="lead">
			<Icon src={Home} class={"mx-auto"  + ($page.url.pathname.startsWith('/home') ? " text-primary-500 stroke-2" : " text-white stroke-1") +" hover:text-primary-700  hover:stroke-2" }/>
		</svelte:fragment>
		<span class={""+ ($page.url.pathname.startsWith('/home') ? " text-primary-500": " text-white" ) + " hover:text-primary-700"}>Home</span>
		</AppRailAnchor>
		<hr class="!border-t-1" />
	{/if}
		<AppRailAnchor href="/search" >
			<svelte:fragment slot="lead">
				<Icon src={MagnifyingGlass} class={"mx-auto " + ($page.url.pathname.startsWith('/search') ? " text-primary-500 stroke-2" : " text-white stroke-1") +" hover:text-primary-700  hover:stroke-2" }/>
			</svelte:fragment>
			<span class={""+ ($page.url.pathname.startsWith('/search') ? " text-primary-500": " text-white" ) + " hover:text-primary-700"}>Suchen</span>
		</AppRailAnchor>
		<hr class="!border-t-1" />
	{#if $isLoggedIn}
		<AppRailAnchor href="/post" >
			<svelte:fragment slot="lead">
				<Icon src={PlusCircle} class={"mx-auto " + ($page.url.pathname.startsWith('/post') ? " text-primary-500 stroke-2" : " text-white stroke-1") +" hover:text-primary-700  hover:stroke-2" }/>
			</svelte:fragment>
			<span class={""+ ($page.url.pathname.startsWith('/post') ? " text-primary-500": " text-white" ) + " hover:text-primary-700"}> Posten</span>
		</AppRailAnchor>
		<hr class="!border-t-1" />
	{/if}
		<AppRailAnchor href="/about" >
			<svelte:fragment slot="lead">
				<Icon src={InformationCircle} class={"mx-auto " + ($page.url.pathname.startsWith('/about') ? " text-primary-500 stroke-2" : " text-white stroke-1") +" hover:text-primary-700  hover:stroke-2" }/>
			</svelte:fragment>
			<span class={""+ ($page.url.pathname.startsWith('/about') ? " text-primary-500": " text-white" ) + " hover:text-primary-700"}>About us</span>
		</AppRailAnchor>
		<hr class="!border-t-1" />
	{#if $isLoggedIn === false}
		<AppRailAnchor href="/login" >
			<svelte:fragment slot="lead">
				<Icon src={ArrowRightOnRectangle} class={"mx-auto " + ($page.url.pathname.startsWith('/login') ? " text-primary-500 stroke-2" : " text-white stroke-1") +" hover:text-primary-700  hover:stroke-2" }/>
			</svelte:fragment>
			<span class={""+ ($page.url.pathname.startsWith('/login') ? " text-primary-500": " text-white" ) + " hover:text-primary-700"}>Anmelden</span>
		</AppRailAnchor>
		<hr class="!border-t-1" />
	{:else}
		<AppRailAnchor href="/myProfile" >
			<svelte:fragment slot="lead">
				<Icon src={UserCircle} class={"mx-auto " + ($page.url.pathname.startsWith('/myProfile') ? " text-primary-500 stroke-2" : " text-white stroke-1") +" hover:text-primary-700  hover:stroke-2" }/>
			</svelte:fragment>
			<span class={""+ ($page.url.pathname.startsWith('/myProfile') ? " text-primary-500": " text-white" ) + " hover:text-primary-700"}> Mein Profil</span>
		</AppRailAnchor>
	{/if}
</AppRail>