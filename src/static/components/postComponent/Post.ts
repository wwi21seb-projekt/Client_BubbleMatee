import type { UploadRestrictions } from '$domains';
export const uploadRestrictions: UploadRestrictions[] = [
	{ type: 'Erlaubte Dateitypen:', value: 'jpeg, webp, png, svg' },
	{ type: 'Maximale Dateigröße:', value: '5 MB' },
	{ type: 'Maximale Dateianzahl:', value: '1' }
];
