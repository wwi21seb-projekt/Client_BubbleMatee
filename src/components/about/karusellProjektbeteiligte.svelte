<script lang="ts">
	import { AccordionItem, tableMapperValues } from '@skeletonlabs/skeleton';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import type { PersonData, PersonSourceData } from '$domains';

	// Central data source for all persons
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
		// Additional persons...
	];

	// Helper function to create TableSource objects
	function createTableSource(data: PersonData[]): TableSource {
		return {
			head: ['Bezeichnung', 'Beschreibung'],
			body: tableMapperValues(data, ['description', 'value']),
			meta: tableMapperValues(data, ['position', 'description', 'value'])
		};
	}

	// Creating TableSource objects for each person in a map
	const tableSources = personsData.map((person) => ({
		...person, // Person takes the entire map from personsData
		table: createTableSource(person.data) // Adds an element through the function
	}));

	// Carousel element
	let elemCarousel: HTMLDivElement;

	// Carousel navigation functions
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
		<!-- Carousel -->
		<div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
			<!-- Button: Left -->
			<button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
				<img src="./src/images/icons/arrow-left.png" alt="DHBW Mannheim Logo" />
			</button>
			<!-- Card consisting of table and image -->
			<div
				bind:this={elemCarousel}
				class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto"
			>
				{#each tableSources as source}
					<div class="snap-center rounded-container-token carousel-item">
						<!-- Image part of the card -->
						<div class="image-container">
							<img class="carousel-image" src={source.src} alt={source.id} loading="lazy" />
						</div>
						<!-- Text part of the card -->
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
	/* Definition of CSS variables for recurring values */
	:root {
		--carousel-item-min-width: 600px; /* Minimum width for carousel items */
		--carousel-item-margin: 20px; /* Outer margin for carousel items */
		--table-container-min-width: 400px; /* Minimum width for table containers */
		--table-container-min-height: 300px; /* Minimum height for table containers */
		--image-container-min-width: 200px; /* Minimum width for image containers */
		--image-container-min-height: 200px; /* Minimum height for image containers */
		--carousel-image-max-width: 200px; /* Maximum width for carousel images */
		--carousel-image-max-height: 200px; /* Maximum height for carousel images */
		--logo-icon-size: 35px; /* Size for logo icons */
	}

	/* Styles for carousel items */
	.carousel-item {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: center;
		min-width: var(--carousel-item-min-width);
		margin-right: var(--carousel-item-margin);
		margin-left: var(--carousel-item-margin);
	}

	/* Styles for table containers */
	.table-container {
		text-align: left;
		width: 100%;
		word-wrap: break-word;
		min-width: var(--table-container-min-width);
		min-height: var(--table-container-min-height);
	}

	/* Styles for image containers */
	.image-container {
		width: 100%;
		display: flex;
		justify-content: center;
		min-width: var(--image-container-min-width);
		min-height: var(--image-container-min-height);
	}

	/* Styles for images in the carousel */
	.carousel-image {
		border-radius: 50%;
		overflow: hidden;
		width: 100%;
		height: auto;
		object-fit: cover; /* Ensures the image fills the container */
		max-width: var(--carousel-image-max-width);
		max-height: var(--carousel-image-max-height);
	}

	/* Styles for various icons */
	.icon-team {
		height: var(--logo-icon-size);
		width: var(--logo-icon-size);
	}

	/* Media Query for small screens (e.g., mobile phones) */
	@media (max-width: 600px) {
		:root {
			--carousel-item-min-width: 360px; /* Full width on small screens */
			--carousel-item-margin: 5px; /* Reduced margin for carousel items */
			--table-container-min-width: 150px; /* Adjusted minimum width for table containers */
			--table-container-min-height: 150px; /* Adjusted minimum height for table containers */
			--image-container-min-width: 150px; /* Adjusted minimum width for image containers */
			--image-container-min-height: 150px; /* Adjusted minimum height for image containers */
			--carousel-image-max-width: 150px; /* Smaller maximum width for images */
			--carousel-image-max-height: 150px; /* Smaller maximum height for images */
			--logo-icon-size: 25px; /* Smaller size for icons */
		}

		.h2 {
			font-size: 1.5rem; /* Smaller font size for headings */
			word-wrap: break-word; /* Forces line break within the container */
			overflow-wrap: break-word; /* Alternative property for line break */
		}

		.carousel-image {
			width: 150px; /* Reduced size for images and icons */
			height: 150px;
		}

		.icon-team {
			display: none;
		}

		.carousel-item {
			flex-direction: column; /* Changes the alignment of flex items */
		}

		/* Adjustments for text and buttons */
		button {
			font-size: 0.9rem; /* Smaller font size for normal text and buttons */
		}

		.btn-icon {
			display: none;
		}
	}
</style>
