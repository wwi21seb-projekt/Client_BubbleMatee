<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton';
	import {
		ProjectDocumentation,
		LegalNotice,
		ProductVideo,
		CarouselProjectParticipants,
		MediaButtonsLogo,
		ServerImprint
	} from '$components';
	import type { ErrorResponse, ImprintResponse } from '$domains';
	import { onMount } from 'svelte';

	export let data: ImprintResponse | ErrorResponse;

	let main: HTMLElement;
	onMount(() => {
		main.scrollIntoView();
	});
</script>

<main bind:this={main}>
	<h1 class="h1">
		<span
			class="bg-gradient-to-br from-primary-900 to-primary-600 dark:from-primary-500 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone"
			>ÜBER UNS</span
		>
	</h1>
	<!-- Separator Line -->
	<hr class="!border-t-8 !border-double" />
	<Accordion>
		<!-- Team -->
		<CarouselProjectParticipants />
		<!-- Documentation -->
		<ProjectDocumentation />
		<!-- Product Video -->
		<ProductVideo />
		<!-- Legal Notes -->
		<LegalNotice />
		<!-- ... -->
		<ServerImprint {data} />
	</Accordion>

	<!-- Separator Line -->
	<hr class="!border-t-8 !border-double" />

	<MediaButtonsLogo />
</main>

<style>
	/* Definition of CSS variables for recurring values */
	:root {
		--default-margin: 2rem; /* Default outer margin */
		--default-font-size-large: 3rem; /* Default size for large text */
	}

	/* Styles for h1 elements */
	.h1 {
		font-size: var(--default-font-size-large);
		text-align: center;
		margin-top: var(--default-margin);
		margin-bottom: var(--default-margin);
		transition: transform 0.3s ease-in-out; /* Transition effect for mouse hover */
	}

	/* Styles for horizontal lines (hr) */
	hr {
		margin-top: var(--default-margin);
		margin-bottom: var(--default-margin);
	}

	/* Media Query for small screens (e.g., mobile phones) */
	@media (max-width: 40rem) {
		:root {
			--default-font-size-large: 2rem; /* Smaller text size for mobile devices */
		}

		.h1 {
			font-size: 2rem; /* Smaller text size for headings */
		}
	}
</style>
