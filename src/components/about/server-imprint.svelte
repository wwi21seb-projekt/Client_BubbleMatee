<script lang="ts">
	import type { ErrorResponse, ImprintResponse } from '$domains';
	import Imprint from '$lib/assets/about/imprint.png';
	import { AccordionItem } from '@skeletonlabs/skeleton';

	export let data: ImprintResponse | ErrorResponse;

	let hasError: boolean = data.error;
	let impressumText: string = 'text' in data.data ? data.data.text : '';
</script>

<AccordionItem>
	<svelte:fragment slot="lead"
		><img src={Imprint} alt="(icon-imprint)" class="icon-imprint" /></svelte:fragment
	>
	<svelte:fragment slot="summary"
		><h2 class="h2">
			<span
				class="bg-gradient-to-br from-warning-900 to-warning-600 dark:from-warning-600 dark:to-warning-300 bg-clip-text text-transparent box-decoration-clone"
				>Impressum des Servers</span
			>
		</h2></svelte:fragment
	>
	<svelte:fragment slot="content">
		<blockquote class="blockquote">
			<p>{hasError ? 'Server ist derzeit nicht verfügbar' : impressumText}</p>
		</blockquote>
	</svelte:fragment>
</AccordionItem>

<style>
	.icon-imprint {
		height: var(--logo-icon-size);
		width: var(--logo-icon-size);
	}
	/* Definition of CSS variables for recurring values */
	:root {
		--logo-icon-size: 2.188rem; /* Size for logo icons */
		--default-font-size-large: 3rem; /* Default size for large text */
	}

	p {
		color: rgba(
			var(--color-surface-50),
			1
		); /* Replace --color-surface-100 with the actual variable name from your palette */
	}

	/* Media Query for small screens (e.g., mobile phones) */
	@media (max-width: 40rem) {
		:root {
			--default-font-size-large: 2rem; /* Smaller text size for mobile devices */
			--logo-icon-size: 1.563rem; /* Smaller size for icons */
		}

		.h2 {
			font-size: 1.5rem; /* Smaller text size for headings */
			word-wrap: break-word; /* Forces line breaks within the container */
			overflow-wrap: break-word; /* Alternative property for line breaks */
		}

		.icon-imprint {
			display: none;
		}

		/* Adjustments for text and buttons */
		p {
			font-size: 0.9rem; /* Smaller text size for normal text and buttons */
		}
	}
</style>
