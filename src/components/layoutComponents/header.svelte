<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppBar padding="p-1">
	<svelte:fragment slot="lead">
		<a href="/">
			<img class="h-10 md:h-16 self-center" src="src/images/layout/logo.png" alt="BubbleMateLogo" />
		</a>
		<img
			class="h-12 md:h-16 self-senter"
			src="src/images/layout/schriftzug.png"
			alt="BubbleMateLogo"
		/>
	</svelte:fragment>
</AppBar>
<hr class="!border-t-2" />
