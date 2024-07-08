import type { UploadRestrictions } from '$domains';
export const uploadRestrictions: UploadRestrictions[] = [
	{ type: 'Erlaubte Dateitypen:', value: 'jpeg, webp, png' }, //input , svg for svg and do changes in filedropzone.svelte and errorMessages.ts
	{ type: 'Maximale Dateigröße:', value: '5 MB' },
	{ type: 'Maximale Dateianzahl:', value: '1' }
];
