import type { Logo, PersonSourceData } from '$domains';

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

// Central data source for all persons
export const personsData: PersonSourceData[] = [
	{
		src: './src/images/about/Professor.png',
		data: [
			{ position: 1, description: 'Name', value: 'Herr Dr. Prof Eichberg' },
			{ position: 2, description: 'Rolle', value: 'Projektbegleiter' },
			{ position: 3, description: 'Modulleiter', value: 'Projektkonzeption' },
			{ position: 4, description: 'Vorleungszeitraum', value: '5./6. Semester' }
		]
	},
	{
		src: './src/images/about/Paul.png',
		data: [
			{ position: 1, description: 'Name', value: 'Paul Bahde' },
			{ position: 2, description: 'Martriktelnummer', value: '5584368' },
			{ position: 3, description: 'Hauptverantwortlichkeit', value: 'Mock-Server' },
			{ position: 4, description: 'Stellvertreter', value: 'Schnittstellenbeauftragter' }
		]
	},
	{
		src: './src/images/about/Jonas.png',
		data: [
			{ position: 1, description: 'Name', value: 'Jonas Braun' },
			{ position: 2, description: 'Martriktelnummer', value: '6813146' },
			{ position: 3, description: 'Hauptverantwortlichkeit', value: 'Build Prozess - CI/CD' },
			{ position: 4, description: 'Stellvertreter', value: 'UI/UX' }
		]
	},
	{
		src: './src/images/about/Johanna.png',
		data: [
			{ position: 1, description: 'Name', value: 'Johanna Deike' },
			{ position: 2, description: 'Martriktelnummer', value: 'xxxxxx' },
			{ position: 3, description: 'Hauptverantwortlichkeit', value: 'UI/UX' },
			{ position: 4, description: 'Stellvertreter', value: 'Mock-Server' }
		]
	},
	{
		src: './src/images/about/Aidan.png',
		data: [
			{ position: 1, description: 'Name', value: 'Aidan Zimmer' },
			{ position: 2, description: 'Martriktelnummer', value: 'xxxxxxxx' },
			{ position: 3, description: 'Hauptverantwortlichkeit', value: 'Schnittstellenbeauftragter' },
			{ position: 4, description: 'Stellvertreter', value: 'Build Prozess - CI/CD' }
		]
	}
];
