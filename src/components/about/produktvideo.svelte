<script>
	import { AccordionItem } from '@skeletonlabs/skeleton';
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<AccordionItem>
	<svelte:fragment slot="lead"
		><img
			src="./src/images/about/video-marketing.png"
			alt="(icon-video)"
			class="video-icon"
		/></svelte:fragment
	>
	<svelte:fragment slot="summary"
		><h2 class="h2">
			<span
				class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
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
	/* Definition von CSS-Variablen für wiederkehrende Werte */
	:root {
		--logo-icon-size: 35px; /* Größe für Logo-Icons */
		--default-font-size-large: 3rem; /* Standardgröße für große Schrift */
	}

	/* Stile für verschiedene Icons */
	.video-icon {
		height: var(--logo-icon-size);
		width: var(--logo-icon-size);
	}

	/* Media Query für kleine Bildschirme (z.B. Mobiltelefone) */
	@media (max-width: 600px) {
		:root {
			--default-font-size-large: 2rem; /* Kleinere Schriftgröße für mobile Geräte */
			--logo-icon-size: 25px; /* Kleinere Größe für Icons */
		}

		.h2 {
			font-size: 1.5rem; /* Kleinere Schriftgröße für Überschriften */
			word-wrap: break-word; /* Erzwingt den Zeilenumbruch innerhalb des Containers */
			overflow-wrap: break-word; /* Alternative Eigenschaft für Zeilenumbruch */
		}

		.video-icon {
			display: none;
		}
	}
</style>
