<script lang="ts">
	import type { Response } from '$domains';
	import { AccordionItem } from '@skeletonlabs/skeleton';

	export let data: Response;
</script>

<AccordionItem>
	<svelte:fragment slot="lead"
		><img
			src="./src/images/about/imprint.png"
			alt="(icon-imprint)"
			class="icon-imprint"
		/></svelte:fragment
	>
	<svelte:fragment slot="summary"
		><h2 class="h2">
			<span
				class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
				>Impressum des Servers</span
			>
		</h2></svelte:fragment
	>
	<svelte:fragment slot="content">
		<blockquote class="blockquote">
			<p>{data.error ? 'Server ist derzeit nicht verfügbar' : data.data.text}</p>
		</blockquote>
	</svelte:fragment>
</AccordionItem>

<style>
	.icon-imprint {
		height: var(--logo-icon-size);
		width: var(--logo-icon-size);
	}
</style>
