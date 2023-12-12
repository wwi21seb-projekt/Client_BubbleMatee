<script>
	import { AccordionItem } from '@skeletonlabs/skeleton';
</script>

<AccordionItem>
	<svelte:fragment slot="lead"
		><img
			src="./src/images/about/folders.png"
			alt="(icon-folders)"
			class="icon-folders"
		/></svelte:fragment
	>
	<svelte:fragment slot="summary"
		><h2 class="h2">
			<span
				class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
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
	/* Definition von CSS-Variablen für wiederkehrende Werte */
	:root {
		--logo-icon-size: 35px; /* Größe für Logo-Icons */
		--default-font-size-large: 3rem; /* Standardgröße für große Schrift */
	}

	/* Stile für verschiedene Icons */
	.icon-folders {
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

		.icon-folders {
			display: none;
		}

		/* Anpassungen für Text und Buttons */
		p {
			font-size: 0.9rem; /* Kleinere Schriftgröße für normalen Text und Buttons */
		}
	}
</style>
