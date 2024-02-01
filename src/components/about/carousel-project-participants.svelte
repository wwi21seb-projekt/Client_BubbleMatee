<script lang="ts">
	import { CarouselElement } from '$components';
	import { Team } from '$images';
	import { AccordionItem } from '@skeletonlabs/skeleton';
</script>

<AccordionItem open>
	<svelte:fragment slot="lead"
		><img src={Team} alt="Bild von allen Teammitgliedern" class="icon-team" /></svelte:fragment
	>
	<svelte:fragment slot="summary"
		><h2 class="h2">
			<span
				class="bg-gradient-to-br from-warning-900 to-warning-600 dark:from-warning-600 dark:to-warning-300 bg-clip-text text-transparent box-decoration-clone"
				>Projektbeteiligte</span
			>
		</h2></svelte:fragment
	>
	<svelte:fragment slot="content">
		<CarouselElement />
	</svelte:fragment>
</AccordionItem>

<style>
	/* Definition of CSS variables for recurring values */
	:root {
		--carousel-item-min-width: 37.5rem; /* Minimum width for carousel items */
		--carousel-item-margin: 1.25rem; /* Outer margin for carousel items */
		--table-container-min-width: 25rem; /* Minimum width for table containers */
		--table-container-min-height: 18.75rem; /* Minimum height for table containers */
		--image-container-min-width: 12.5rem; /* Minimum width for image containers */
		--image-container-min-height: 12.5rem; /* Minimum height for image containers */
		--carousel-image-max-width: 12.5rem; /* Maximum width for carousel images */
		--carousel-image-max-height: 12.5rem; /* Maximum height for carousel images */
		--logo-icon-size: 2.188rem; /* Size for logo icons */
	}

	/* Styles for various icons */
	.icon-team {
		height: var(--logo-icon-size);
		width: var(--logo-icon-size);
	}

	/* Media Query for small screens (e.g., mobile phones) */
	@media (max-width: 768px) {
		:root {
			--carousel-item-min-width: 13.5rem; /* Full width on small screens */
			--carousel-item-margin: 0.313rem; /* Reduced margin for carousel items */
			--table-container-min-width: 9.375rem; /* Adjusted minimum width for table containers */
			--table-container-min-height: 9.375rem; /* Adjusted minimum height for table containers */
			--image-container-min-width: 9.375rem; /* Adjusted minimum width for image containers */
			--image-container-min-height: 9.375rem; /* Adjusted minimum height for image containers */
			--carousel-image-max-width: 9.375rem; /* Smaller maximum width for images */
			--carousel-image-max-height: 9.375rem; /* Smaller maximum height for images */
			--logo-icon-size: 1.563rem; /* Smaller size for icons */
		}

		.h2 {
			font-size: 1.5rem; /* Smaller font size for headings */
			word-wrap: break-word; /* Forces line break within the container */
			overflow-wrap: break-word; /* Alternative property for line break */
		}

		.icon-team {
			display: none;
		}
	}
</style>
