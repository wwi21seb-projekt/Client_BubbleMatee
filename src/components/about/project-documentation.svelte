<script>
	import { AccordionItem } from '@skeletonlabs/skeleton';
</script>

<AccordionItem>
	<svelte:fragment slot="lead"
		><img
			src="./src/images/about/folders.png"
			alt="icon für den Inhalt der Projektdokumentation"
			class="icon-folders"
		/></svelte:fragment
	>
	<svelte:fragment slot="summary"
		><h2 class="h2">
			<span
				class="bg-gradient-to-br from-warning-600 to-warning-300 bg-clip-text text-transparent box-decoration-clone"
				>Dokumentation</span
			>
		</h2>
	</svelte:fragment>
	<svelte:fragment slot="content">
		<blockquote class="blockquote">
			<h3>Projektdokumentation</h3>
			<p>
				Das Hauptrepository unseres Projekts <strong>"Client_BubbleMatee"</strong>, welches den
				gesamten Code und die dazugehörigen Materialien beinhaltet, finden Sie auf GitHub unter dem
				folgenden Link:
				<a
					href="https://github.com/wwi21seb-projekt/Client_BubbleMatee"
					target="_blank"
					style="text-decoration: underline;">Client_BubbleMatee Repository</a
				>.
			</p>
			<p>
				Ergänzend dazu umfasst unser Dokumentationsrepository <strong
					>"Documentation_Client_BubbleMatee"</strong
				>
				die gesamte Projektplanung und Prüfungsleistungen, einschließlich der Präsentationen. Dieses
				bietet einen umfassenden Einblick in die konzeptionelle Arbeit unseres Teams:
				<a
					href="https://github.com/wwi21seb-projekt/Documentation_Client_BubbleMatee"
					target="_blank"
					style="text-decoration: underline;">Documentation_Client_BubbleMatee Repository</a
				>.
			</p>
			<p>
				Wir ermutigen alle Interessierten, die Repositories zu besuchen und einen tiefgreifenden
				Einblick in unser Projekt zu gewinnen. Für Fragen, Feedback und Anregungen sind wir stets
				offen und dankbar.
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
	.icon-folders {
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

		.icon-folders {
			display: none;
		}

		/* Adjustments for text and buttons */
		p {
			font-size: 0.9rem; /* Smaller text size for normal text and buttons */
		}
	}
</style>
