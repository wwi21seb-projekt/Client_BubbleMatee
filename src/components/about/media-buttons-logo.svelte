<script lang="ts">
	import { logos } from '../../static/components/index.ts';
</script>

<!-- Logos dhbw insta x -->
<div class="logo-cloud grid grid-cols-1 lg:grid-cols-3 gap-4">
	{#each logos as logo}
		<a class="logo-item flex flex-col items-center" href={logo.url}>
			<img src={logo.src} alt={logo.description} class="h-12 w-auto mb-2" />
			<span>{logo.name}</span>
		</a>
	{/each}
	<!-- More logos... -->
</div>

<style>
	/* Definition of CSS variables for recurring values */
	:root {
		--logo-item-margin: 0.5rem; /* Outer margin for logo elements */
	}

	/* Styles for the logo area */
	.logo-cloud {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	/* Styles for individual logo elements */
	.logo-item {
		margin: var(--logo-item-margin);
	}

	/* Styles for text within the logo elements */
	.logo-item > span {
		display: block;
		text-align: center;
	}

	/* Media Query for small screens (e.g., mobile phones) */
	@media (max-width: 40rem) {
		:root {
			--logo-item-margin: 0.25rem; /* Reduced margin for logos */
		}

		.logo-item {
			margin: var(--logo-item-margin); /* Smaller margin */
		}

		.logo-item > span {
			font-size: 0.8rem; /* Smaller font size for logo text */
		}
	}
</style>
