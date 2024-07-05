import type { Logo, PersonSourceData } from '$domains';
import Aidan from '$lib/assets/about/Aidan.png';
import Dhbw from '$lib/assets/about/DHBW.jpg';
import Instagram from '$lib/assets/about/Instagram.png';
import Johanna from '$lib/assets/about/Johanna.png';
import Jonas from '$lib/assets/about/Jonas.png';
import Paul from '$lib/assets/about/Paul.png';
import Professor from '$lib/assets/about/Professor.png';
import Twitter from '$lib/assets/about/x.avif';

// Creating a collection of logos
export const logos: Logo[] = [
	{
		name: 'DHBW Mannheim',
		url: 'https://www.mannheim.dhbw.de/startseite',
		src: Dhbw,
		description: 'DHBW Mannheim Logo'
	},
	{
		name: 'Instagram',
		url: 'https://www.instagram.com/',
		src: Instagram,
		description: 'Instagram Logo'
	},
	{
		name: 'Twitter',
		url: 'https://twitter.com/?lang=de',
		src: Twitter,
		description: 'Twitter Logo'
	}
	// Add more logos here...
];

// Central data source for all persons
export const personsData: PersonSourceData[] = [
	{
		src: Professor,
		data: [
			{ position: 1, description: 'Name', value: 'Herr Dr. Prof Eichberg' },
			{ position: 2, description: 'Rolle', value: 'Projektbegleiter' },
			{ position: 3, description: 'Modulleiter', value: 'Projektkonzeption' },
			{ position: 4, description: 'Vorlesungszeitraum', value: '5./6. Semester' }
		]
	},
	{
		src: Paul,
		data: [
			{ position: 1, description: 'Name', value: 'Paul Bahde' },
			{ position: 2, description: 'Rolle', value: 'Projektmitglied' },
			{ position: 3, description: 'Hauptverantwortlichkeit', value: 'Mock-Server' },
			{ position: 4, description: 'Stellvertreter', value: 'Schnittstellenbeauftragter' }
		]
	},
	{
		src: Jonas,
		data: [
			{ position: 1, description: 'Name', value: 'Jonas Braun' },
			{ position: 2, description: 'Rolle', value: 'Projektmitglied' },
			{ position: 3, description: 'Hauptverantwortlichkeit', value: 'Build Prozess - CI/CD' },
			{ position: 4, description: 'Stellvertreter', value: 'UI/UX' }
		]
	},
	{
		src: Johanna,
		data: [
			{ position: 1, description: 'Name', value: 'Johanna Deike' },
			{ position: 2, description: 'Rolle', value: 'Projektmitglied' },
			{ position: 3, description: 'Hauptverantwortlichkeit', value: 'UI/UX' },
			{ position: 4, description: 'Stellvertreter', value: 'Mock-Server' }
		]
	},
	{
		src: Aidan,
		data: [
			{ position: 1, description: 'Name', value: 'Aidan Zimmer' },
			{ position: 2, description: 'Rolle', value: 'Projektmitglied' },
			{ position: 3, description: 'Hauptverantwortlichkeit', value: 'Schnittstellenbeauftragter' },
			{ position: 4, description: 'Stellvertreter', value: 'Build Prozess - CI/CD' }
		]
	}
];
