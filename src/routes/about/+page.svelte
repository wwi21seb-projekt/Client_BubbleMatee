<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton';
	import {
		ProjectDocumentation,
		LegalNotice,
		ProductVideo,
		CarouselProjectParticipants,
		MediaButtonsLogo,
		ServerTeam
	} from '$components';
</script>

<h1 class="h1">
	<span
		class="bg-gradient-to-br from-tertiary-500 to-tertiary-200 bg-clip-text text-transparent box-decoration-clone"
		>ABOUT US</span
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
</Accordion>

<!-- Separator Line -->
<hr class="!border-t-8 !border-double" />

<MediaButtonsLogo />

<!-- Separator Line -->
<hr class="!border-t-8 !border-double" />

<ServerTeam />

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

	.h1:hover {
		transform: scale(1.1); /* Enlarge on hover */
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
