<script lang="ts">
	import Law from '$lib/assets/about/law.png';
	import { AccordionItem } from '@skeletonlabs/skeleton';
</script>

<AccordionItem>
	<svelte:fragment slot="lead"
		><img src={Law} alt="Bild zum Gesetzestext" class="icon-law" /></svelte:fragment
	>
	<svelte:fragment slot="summary"
		><h2 class="h2">
			<span
				class="bg-gradient-to-br from-warning-900 to-warning-600 dark:from-warning-600 dark:to-warning-300 bg-clip-text text-transparent box-decoration-clone"
				>Gesetzliche Richtlinien</span
			>
		</h2></svelte:fragment
	>
	<svelte:fragment slot="content">
		<blockquote class="blockquote">
			<h3>Rechtlicher Hinweis</h3>
			<p>
				Dies ist ein Studentenprojekt und ist im Rahmen des Moduls Projektkonzeption an der Dualen
				Hochschule Baden Württemberg Mannheim entstanden. Alle Inhalte und Materialien, die im
				Rahmen dieses Projekts bereitgestellt werden, dienen ausschließlich Bildungszwecken.
			</p>

			<p>
				<strong>Haftungsausschluss:</strong> Die Projektteilnehmer, Tutoren und die Bildungseinrichtung
				übernehmen keine Haftung für die Korrektheit, Vollständigkeit und Aktualität der bereitgestellten
				Inhalte. Jegliche Nutzung der auf diesen Seiten dargestellten Informationen erfolgt auf eigenes
				Risiko des Nutzers.
			</p>
		</blockquote>
	</svelte:fragment>
</AccordionItem>

<style>
	/* Definition of CSS variables for recurring values */
	:root {
		--logo-icon-size: 2.188rem; /* Size for logo icons */
		--default-font-size-large: 3rem; /* Default size for large text */
	}

	/* Styles for various icons */
	.icon-law {
		height: var(--logo-icon-size);
		width: var(--logo-icon-size);
	}

	h3 {
		color: rgba(
			var(--color-surface-50),
			1
		); /* Replace --color-surface-100 with the actual variable name from your palette */
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

		.icon-law {
			display: none;
		}

		/* Adjustments for text and buttons */
		p {
			font-size: 0.9rem; /* Smaller text size for normal text and buttons */
		}
	}
</style>
