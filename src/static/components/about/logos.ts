import type { Logo } from '$domains';

// Creating a collection of logos
export const logos: Logo[] = [
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
