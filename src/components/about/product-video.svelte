<script>
	import { AccordionItem } from '@skeletonlabs/skeleton';
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<AccordionItem>
	<svelte:fragment slot="lead"
		><img
			src="./src/images/about/video-marketing.png"
			alt="icon für den Inhalt des Produktvideos"
			class="video-icon"
		/></svelte:fragment
	>
	<svelte:fragment slot="summary"
		><h2 class="h2">
			<span
				class="bg-gradient-to-br from-warning-600 to-warning-300 bg-clip-text text-transparent box-decoration-clone"
				>Produktvideo</span
			>
		</h2>
	</svelte:fragment>
	<svelte:fragment slot="content">
		<video src="pfad/zu/deinem/video.mp4" controls poster="pfad/zu/deinem/poster.jpg">
			Dein Browser unterstützt das Video-Tag nicht.
		</video>
	</svelte:fragment>
</AccordionItem>

<style>
	/* Definition of CSS variables for recurring values */
	:root {
		--logo-icon-size: 2.188rem; /* Size for logo icons */
		--default-font-size-large: 3rem; /* Standard size for large text */
	}

	/* Styles for various icons */
	.video-icon {
		height: var(--logo-icon-size);
		width: var(--logo-icon-size);
	}

	/* Media Query for small screens (e.g., mobile phones) */
	@media (max-width: 40rem) {
		:root {
			--default-font-size-large: 2rem; /* Smaller font size for mobile devices */
			--logo-icon-size: 1.563rem; /* Smaller size for icons */
		}

		.h2 {
			font-size: 1.5rem; /* smaller size for title */
			word-wrap: break-word; /* foreces line break in container*/
			overflow-wrap: break-word; /* alternative linebreak */
		}

		.video-icon {
			display: none;
		}
	}
</style>
