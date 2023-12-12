<script lang="ts">
	import type { Logo } from '$domains';

	// Erstellen einer Sammlung von Logos
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
		// Fügen Sie hier weitere Logos hinzu...
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
	<!-- Weitere Logos... -->
</div>

<style>
	/* Definition von CSS-Variablen für wiederkehrende Werte */
	:root {
		--logo-item-margin: 0.5rem; /* Außenabstand für Logo-Elemente */
	}

	/* Stile für den Logo-Bereich */
	.logo-cloud {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	/* Stile für einzelne Logo-Elemente */
	.logo-item {
		margin: var(--logo-item-margin);
	}

	/* Stile für Text innerhalb der Logo-Elemente */
	.logo-item > span {
		display: block;
		text-align: center;
	}

	/* Media Query für kleine Bildschirme (z.B. Mobiltelefone) */
	@media (max-width: 600px) {
		:root {
			--logo-item-margin: 0.25rem; /* Geringerer Abstand für Logos */
		}

		.logo-item {
			margin: var(--logo-item-margin); /* Kleinerer Abstand */
		}

		/* Anpassungen für Text und Buttons */
		p {
			font-size: 0.9rem; /* Kleinere Schriftgröße für normalen Text und Buttons */
		}

		.logo-item > span {
			font-size: 0.8rem; /* Kleinere Schriftgröße für Logo-Text */
		}
	}
</style>
