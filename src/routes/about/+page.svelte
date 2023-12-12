<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton';
	import {
		Projektdokumentation,
		RechtlicheHinweise,
		Produktvideo,
		KarusellProjektbeteiligte,
		MediaButtonLogos
	} from '$components';
</script>

<h1 class="h1">
	<span
		class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
		>ABOUT US</span
	>
</h1>
<hr class="!border-t-8" />
<Accordion>
	<!-- Team -->
	<KarusellProjektbeteiligte />
	<!-- Dokumentationen -->
	<Projektdokumentation />
	<!-- Produktvideo -->
	<!-- svelte-ignore a11y-media-has-caption -->
	<Produktvideo />
	<!-- Rechtliche Hinweise -->
	<RechtlicheHinweise />
	<!-- ... -->
</Accordion>

<!-- Trennline -->
<hr class="!border-t-8 !border-double" />

<MediaButtonLogos />

<style>
	/* Definition von CSS-Variablen für wiederkehrende Werte */
	:root {
		--primary-color: #007bff; /* Hauptfarbe der Anwendung */
		--line-color: #a0a0a0; /* Graue Farbe für Linien */
		--default-margin: 2rem; /* Standardaußenabstand */
		--default-font-size-large: 3rem; /* Standardgröße für große Schrift */
	}

	/* Stile für h1-Elemente */
	.h1 {
		font-size: var(--default-font-size-large);
		text-align: center;
		margin-top: var(--default-margin);
		margin-bottom: var(--default-margin);
		transition: transform 0.3s ease-in-out; /* Übergangseffekt für Maus-Hover */
	}

	.h1:hover {
		transform: scale(1.1); /* Vergrößern beim Hovern */
	}

	/* Stile für horizontale Linien (hr) */
	hr {
		border-top: 8px double var(--line-color); /* Doppelte Linie mit grauer Farbe */
		margin-top: var(--default-margin);
		margin-bottom: var(--default-margin);
	}

	/* Media Query für kleine Bildschirme (z.B. Mobiltelefone) */
	@media (max-width: 600px) {
		:root {
			--default-font-size-large: 2rem; /* Kleinere Schriftgröße für mobile Geräte */
		}

		.h1 {
			font-size: 2rem; /* Kleinere Schriftgröße für Überschriften */
		}
	}
</style>
