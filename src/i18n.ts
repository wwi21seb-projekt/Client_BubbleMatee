import { derived, writable, type Writable } from 'svelte/store';
import translations from './translations';

export const locale: Writable<string> = writable('en');
export const locales = Object.keys(translations);

interface Translations {
	[key: string]: {
		[key: string]: string;
	};
}

function translate(locale: string, key: string) {
	// Let's throw some errors if we're trying to use keys/locales that don't exist.
	// We could improve this by using Typescript and/or fallback values.
	if (!key) throw new Error('no key provided to $t()');
	if (!locale) throw new Error(`no translation for key "${key}"`);

	let fileInput: Translations = translations;

	// Grab the translation from the translations object.
	let text: string = fileInput[locale][key];

	if (!text) throw new Error(`no translation found for ${locale}.${key}`);

	return text;
}

export const t = derived(locale, ($locale) => (key: string) => translate($locale, key));
