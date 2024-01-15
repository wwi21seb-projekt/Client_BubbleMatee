<script lang="ts">
	import { page } from '$app/stores';
	import { Settings } from '$components';
	import { AppBar, LightSwitch, modeCurrent, setModeUserPrefers } from '@skeletonlabs/skeleton';

	const handleLightSwitch = () => {
		setModeUserPrefers($modeCurrent);
	};
</script>

<!-- App Shell -->
<AppBar padding="p-1">
	<svelte:fragment slot="lead">
		<div class="flex items-center">
			<a href="/">
				<img
					class="h-10 md:h-16 self-center"
					src="/src/images/layout/logo.png"
					alt="BubbleMateLogo"
				/>
			</a>
			<img
				class="h-12 md:h-16 self-center"
				src="/src/images/layout/schriftzug.png"
				alt="BubbleMateLogo"
			/>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch on:click={handleLightSwitch} />
		{#if $page.url.pathname === '/myProfile'}
			<Settings />
		{/if}
	</svelte:fragment>
</AppBar>
