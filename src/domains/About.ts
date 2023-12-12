// Definieren einer Schnittstelle für Personendaten
export interface PersonData {
	position: number;
	description: string;
	value: string;
}

// Definieren einer Schnittstelle für die Quelldaten der Personen
export interface PersonSourceData {
	id: string;
	src: string;
	data: PersonData[];
}

export interface Logo {
	name: string;
	url: string;
	src: string;
	description: string;
}

export interface Imprint {
	text: string;
}
