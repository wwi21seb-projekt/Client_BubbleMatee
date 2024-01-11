<script lang="ts">
	import {
		AccordionItem,
		tableMapperValues,
		Table,
		type TableSource
	} from '@skeletonlabs/skeleton';
	import type { PersonData } from '$domains';
	import { personsData } from '../../static/components/index.ts';
	import { ListProjectParticipants } from '$components';
	import { ArrowLeftIcon, ArrowRightIcon } from '$images';

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

<div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
	<button
		type="button"
		class="btn-icon variant-filled-secondary dark:variant-filled-primary"
		on:click={carouselLeft}
	>
		<ArrowLeftIcon />
	</button>
	<div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto">
		{#each tableSources as source}
			<div class="snap-center rounded-container-token carousel-item">
				<div class="image-container items-center">
					<img class="carousel-image" src={source.src} alt="Bild von Person" loading="lazy" />
				</div>
				<div class="table-container tableData">
					<Table source={source.table} />
				</div>
				<div class="table-container flex tableDataText">
					<ListProjectParticipants source={source.data} />
				</div>
			</div>
			<span class="divider-vertical h-100" />
		{/each}
	</div>
	<button
		type="button"
		class="btn-icon variant-filled-secondary dark:variant-filled-primary"
		on:click={carouselRight}
	>
		<ArrowRightIcon />
	</button>
</div>

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
		margin-right: 20px;
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
	.tableData {
		display: flex;
	}

	.tableDataText {
		display: none;
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

		.carousel-image {
			width: 9.375rem; /* Reduced size for images and icons */
			height: 9.375rem;
			margin-bottom: 10px;
			margin-left: 0px;
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

		.table-container {
			text-align: center;
		}

		.tableData {
			display: none;
		}

		.tableDataText {
			display: flex;
		}
	}
</style>
