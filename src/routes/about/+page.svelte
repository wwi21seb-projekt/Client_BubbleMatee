<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton';
	import {
		Projektdokumentation,
		RechtlicheHinweise,
		Produktvideo,
		KarusellProjektbeteiligte,
		MediaButtonLogos,
		Serverteam
	} from '$components';
</script>

<h1 class="h1">
	<span
		class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
		>ABOUT US</span
	>
</h1>
<!-- Separator Line -->
<hr class="!border-t-8" />
<Accordion>
	<!-- Team -->
	<KarusellProjektbeteiligte />
	<!-- Documentation -->
	<Projektdokumentation />
	<!-- Product Video -->
	<Produktvideo />
	<!-- Legal Notes -->
	<RechtlicheHinweise />
	<!-- ... -->
</Accordion>

<!-- Separator Line -->
<hr class="!border-t-8 !border-double" />

<MediaButtonLogos />

<!-- Separator Line -->
<hr class="!border-t-8 !border-double" />

<Serverteam />

<style>
	/* Definition of CSS variables for recurring values */
	:root {
		--primary-color: #007bff; /* Main color of the application */
		--line-color: #a0a0a0; /* Gray color for lines */
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

	.h1:hover {
		transform: scale(1.1); /* Enlarge on hover */
	}

	/* Styles for horizontal lines (hr) */
	hr {
		border-top: 8px double var(--line-color); /* Double line with gray color */
		margin-top: var(--default-margin);
		margin-bottom: var(--default-margin);
	}

	/* Media Query for small screens (e.g., mobile phones) */
	@media (max-width: 600px) {
		:root {
			--default-font-size-large: 2rem; /* Smaller text size for mobile devices */
		}

		.h1 {
			font-size: 2rem; /* Smaller text size for headings */
		}
	}
</style>
