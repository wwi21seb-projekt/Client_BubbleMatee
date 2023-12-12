<script lang="ts">
	import type { Logo } from '$domains';

	// Creating a collection of logos
	const logos: Logo[] = [
		{
			name: 'DHBW Mannheim',
			url: 'https://www.mannheim.dhbw.de/startseite',
			src: './src/images/about/DHBW.jpg',
			description: 'DHBW Mannheim Logo'
		},
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/',
			src: './src/images/about/Instagram.png',
			description: 'Instagram Logo'
		},
		{
			name: 'Twitter',
			url: 'https://twitter.com/?lang=de',
			src: './src/images/about/x.avif',
			description: 'Twitter Logo'
		}
		// Add more logos here...
	];
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
	@media (max-width: 600px) {
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
