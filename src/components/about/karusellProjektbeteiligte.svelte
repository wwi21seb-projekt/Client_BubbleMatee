<script lang="ts">
	import { AccordionItem, tableMapperValues } from '@skeletonlabs/skeleton';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import type { PersonData, PersonSourceData } from '$domains';

	// Zentrale Datenquelle für alle Personen
	const personsData: PersonSourceData[] = [
		{
			id: 'Jp6O3FFRdEI',
			src: './src/images/about/Professor.png',
			data: [
				{ position: 1, description: 'Name', value: 'Herr Dr. Prof Eichberg' },
				{ position: 2, description: 'Rolle', value: 'Projektbegleiter' },
				{ position: 3, description: 'Modulleiter', value: 'Projektkonzeption' },
				{ position: 4, description: 'Vorleungszeitraum', value: '5./6. Semester' }
			]
		},
		{
			id: 'I3C_eojFVQY',
			src: './src/images/about/Paul.png',
			data: [
				{ position: 1, description: 'Name', value: 'Paul Bahde' },
				{ position: 2, description: 'Martriktelnummer', value: '5584368' },
				{ position: 3, description: 'Hauptverantwortlichkeit', value: 'Mock-Server' },
				{ position: 4, description: 'Stellvertreter', value: 'Schnittstellenbeauftragter' }
			]
		},
		{
			id: 'Jp6O3FFRdEI',
			src: './src/images/about/Jonas.png',
			data: [
				{ position: 1, description: 'Name', value: 'Jonas Braun' },
				{ position: 2, description: 'Martriktelnummer', value: '6813146' },
				{ position: 3, description: 'Hauptverantwortlichkeit', value: 'Build Prozess - CI/CD' },
				{ position: 4, description: 'Stellvertreter', value: 'UI/UX' }
			]
		},
		{
			id: 'Jp6O3FFRdEI',
			src: './src/images/about/Johanna.png',
			data: [
				{ position: 1, description: 'Name', value: 'Johanna Deike' },
				{ position: 2, description: 'Martriktelnummer', value: 'xxxxxx' },
				{ position: 3, description: 'Hauptverantwortlichkeit', value: 'UI/UX' },
				{ position: 4, description: 'Stellvertreter', value: 'Mock-Server' }
			]
		},
		{
			id: 'Jp6O3FFRdEI',
			src: './src/images/about/Aidan.png',
			data: [
				{ position: 1, description: 'Name', value: 'Aidan Zimmer' },
				{ position: 2, description: 'Martriktelnummer', value: 'xxxxxxxx' },
				{
					position: 3,
					description: 'Hauptverantwortlichkeit',
					value: 'Schnittstellenbeauftragter'
				},
				{ position: 4, description: 'Stellvertreter', value: 'Build Prozess - CI/CD' }
			]
		}
		// Weitere Personen...
	];

	// Hilfsfunktion zur Erstellung von TableSource-Objekten
	function createTableSource(data: PersonData[]): TableSource {
		return {
			head: ['Bezeichnung', 'Beschreibung'],
			body: tableMapperValues(data, ['description', 'value']),
			meta: tableMapperValues(data, ['position', 'description', 'value'])
		};
	}

	// Erstellen der TableSource Objekte für jede Person in einer Map
	const tableSources = personsData.map((person) => ({
		...person, //person übernimmt die gesamte map aus personsData
		table: createTableSource(person.data) //fügt ein Element durch die Funktion hinzu
	}));

	//Karusellelement
	let elemCarousel: HTMLDivElement;

	// Karussell-Navigationsfunktionen

	function carouselMove(direction: 'left' | 'right'): void {
		const step = elemCarousel.clientWidth;
		const maxScroll = elemCarousel.scrollWidth - step;
		let newX =
			direction === 'left'
				? Math.max(0, elemCarousel.scrollLeft - step)
				: Math.min(maxScroll, elemCarousel.scrollLeft + step);

		elemCarousel.scroll(newX, 0);
	}

	function carouselLeft(): void {
		carouselMove('left');
	}

	function carouselRight(): void {
		carouselMove('right');
	}
</script>

<AccordionItem open>
	<svelte:fragment slot="lead"
		><img src="./src/images/about/team.png" alt="(icon-team)" class="icon-team" /></svelte:fragment
	>
	<svelte:fragment slot="summary"
		><h2 class="h2">
			<span
				class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
				>Projektbeteiligte</span
			>
		</h2></svelte:fragment
	>
	<svelte:fragment slot="content">
		<!-- Karusell-->
		<div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
			<!-- Button: Left -->
			<button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
				<img src="./src/images/icons/arrow-left.png" alt="DHBW Mannheim Logo" />
			</button>
			<!-- Karte bestehend aus tabelle und bild -->
			<div
				bind:this={elemCarousel}
				class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto"
			>
				{#each tableSources as source}
					<div class="snap-center rounded-container-token carousel-item">
						<!-- Bild-Teil der Karte -->
						<div class="image-container">
							<img class="carousel-image" src={source.src} alt={source.id} loading="lazy" />
						</div>
						<!-- Text-Teil der Karte -->
						<div class="table-container">
							<Table source={source.table} />
						</div>
					</div>
					<span class="divider-vertical h-72" />
				{/each}
			</div>
			<!-- Button: Right -->
			<button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
				<img src="./src/images/icons/arrow-right.png" alt="DHBW Mannheim Logo" />
			</button>
		</div>
	</svelte:fragment>
</AccordionItem>

<style>
	/* Definition von CSS-Variablen für wiederkehrende Werte */
	:root {
		--carousel-item-min-width: 600px; /* Mindestbreite für Karussell-Elemente */
		--carousel-item-margin: 20px; /* Außenabstand für Karussell-Elemente */
		--table-container-min-width: 400px; /* Mindestbreite für Tabellencontainer */
		--table-container-min-height: 300px; /* Mindesthöhe für Tabellencontainer */
		--image-container-min-width: 200px; /* Mindestbreite für Bildcontainer */
		--image-container-min-height: 200px; /* Mindesthöhe für Bildcontainer */
		--carousel-image-max-width: 200px; /* Maximale Breite für Karussell-Bilder */
		--carousel-image-max-height: 200px; /* Maximale Höhe für Karussell-Bilder */
		--logo-icon-size: 35px; /* Größe für Logo-Icons */
	}

	/* Stile für Karussell-Elemente */
	.carousel-item {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: center;
		min-width: var(--carousel-item-min-width);
		margin-right: var(--carousel-item-margin);
		margin-left: var(--carousel-item-margin);
	}

	/* Stile für Tabellencontainer */
	.table-container {
		text-align: left;
		width: 100%;
		word-wrap: break-word;
		min-width: var(--table-container-min-width);
		min-height: var(--table-container-min-height);
	}

	/* Stile für Bildcontainer */
	.image-container {
		width: 100%;
		display: flex;
		justify-content: center;
		min-width: var(--image-container-min-width);
		min-height: var(--image-container-min-height);
	}

	/* Stile für Bilder im Karussell */
	.carousel-image {
		border-radius: 50%;
		overflow: hidden;
		width: 100%;
		height: auto;
		object-fit: cover; /* Sorgt dafür, dass das Bild den Container ausfüllt */
		max-width: var(--carousel-image-max-width);
		max-height: var(--carousel-image-max-height);
	}

	/* Stile für verschiedene Icons */
	.icon-team {
		height: var(--logo-icon-size);
		width: var(--logo-icon-size);
	}

	/* Media Query für kleine Bildschirme (z.B. Mobiltelefone) */
	@media (max-width: 600px) {
		:root {
			--carousel-item-min-width: 360px; /* Vollständige Breite auf kleinen Bildschirmen */
			--carousel-item-margin: 5px; /* Geringerer Abstand für Karussell-Elemente */
			--table-container-min-width: 150px; /* Anpassung der Mindestbreite für Tabellencontainer */
			--table-container-min-height: 150px; /* Anpassung der Mindesthöhe für Tabellencontainer */
			--image-container-min-width: 150px; /* Anpassung der Mindestbreite für Bildcontainer */
			--image-container-min-height: 150px; /* Anpassung der Mindesthöhe für Bildcontainer */
			--carousel-image-max-width: 150px; /* Kleinere Maximalbreite für Bilder */
			--carousel-image-max-height: 150px; /* Kleinere Maximalhöhe für Bilder */
			--logo-icon-size: 25px; /* Kleinere Größe für Icons */
		}

		.h2 {
			font-size: 1.5rem; /* Kleinere Schriftgröße für Überschriften */
			word-wrap: break-word; /* Erzwingt den Zeilenumbruch innerhalb des Containers */
			overflow-wrap: break-word; /* Alternative Eigenschaft für Zeilenumbruch */
		}

		.carousel-image {
			width: 150px; /* Verringerte Größe für Bilder und Icons */
			height: 150px;
		}

		.icon-team {
			display: none;
		}

		.carousel-item {
			flex-direction: column; /* Ändert die Ausrichtung der Flex-Items */
		}

		/* Anpassungen für Text und Buttons */
		button {
			font-size: 0.9rem; /* Kleinere Schriftgröße für normalen Text und Buttons */
		}

		.btn-icon {
			display: none;
		}
	}
</style>
