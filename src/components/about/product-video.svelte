<script>
	import VideoMarketing from '$lib/assets/about/video-marketing.png';
	import { AccordionItem } from '@skeletonlabs/skeleton';
</script>

<AccordionItem>
	<svelte:fragment slot="lead"
		><img
			src={VideoMarketing}
			alt="icon für den Inhalt des Produktvideos"
			class="video-icon"
		/></svelte:fragment
	>
	<svelte:fragment slot="summary"
		><h2 class="h2">
			<span
				class="bg-gradient-to-br from-warning-900 to-warning-600 dark:from-warning-600 dark:to-warning-300 bg-clip-text text-transparent box-decoration-clone"
				>Produktvideo</span
			>
		</h2>
	</svelte:fragment>
	<svelte:fragment slot="content">
		<iframe
			width="560"
			height="315"
			src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=oXg6NlZ94uWhuo1h"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
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
