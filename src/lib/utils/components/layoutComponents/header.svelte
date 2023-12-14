<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppBar
padding=p-0>
	<svelte:fragment slot="lead">
		<img class="w-16" src="src/images/layout/logo.png" alt="BubbleMateLogo" />
	</svelte:fragment>
	<h1
		class="text-center text-4xl md:text-5xl bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
	>
		BubbleMatee
	</h1>
</AppBar>
<hr class="!border-t-2" />

