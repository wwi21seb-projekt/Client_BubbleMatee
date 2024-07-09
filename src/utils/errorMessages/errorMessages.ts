import type { Error } from '$domains';
import { redirectToLogin1, redirectToLogin2 } from '$stores/loading';

const errorMessages: Array<Error> = [
	{
		code: 'ERR-001',
		message: 'Die Daten sind fehlerhaft. Bitte überprüfe deine Eingaben und versuche es erneut.'
	},
	{
		code: 'ERR-002',
		message: 'Der Benutzername ist bereits vergeben. Bitte wähle einen anderen Benutzernamen.'
	},
	{
		code: 'ERR-003',
		message: 'Die E-Mail-Adresse ist bereits vergeben. Bitte wähle eine andere E-Mail-Adresse.'
	},
	{
		code: 'ERR-004',
		message:
			'Der Username wurde nicht gefunden. Bitte überprüfe deine Eingaben und versuche es erneut.'
	},
	{
		code: 'ERR-005',
		message: 'Der Username ist nicht aktiviert. Bitte aktiviere deinen Account.'
	},
	{
		code: 'ERR-006',
		message:
			'Der Code ist nicht mehr gültig. Bitte schaue, ob du einen neuen Code per Email bekommen hast und versuche es erneut.'
	},
	{
		code: 'ERR-007',
		message: 'Der Code ist ungültig. Bitte überprüfe deine Eingaben und versuche es erneut.'
	},
	{
		code: 'ERR-008',
		message:
			'Die Eingaben sind nicht korrekt. Bitte überprüfe deine Eingaben und versuche es erneut.'
	},
	{
		code: 'ERR-009',
		message: 'Ein interner Serverfehler ist aufgetreten. Bitte versuche es später erneut.'
	},
	{
		code: 'ERR-010',
		message: 'Ein Datenbankfehler ist aufgetreten. Bitte versuche es später erneut.'
	},
	{
		code: 'ERR-011',
		message:
			'Die E-Mail-Adresse konnte nicht gefunden werden. Bitte überprüfe deine Eingaben und versuche es erneut.'
	},
	{
		code: 'ERR-012',
		message: 'Die E-Mail konnte nicht versendet werden. Bitte versuche es später erneut.'
	},
	{
		code: 'ERR-013',
		message: 'Der User wurde bereits aktiviert. Bitte logge dich ein.'
	},
	{
		code: 'ERR-014',
		message:
			'Die Anfrage ist nicht autorisiert. Bitte melde dich mit deinem Account an und versuche es erneut.'
	},
	{
		code: 'ERR-015',
		message: 'Du folgst dieser Person nicht. Überprüfe deine Eingaben und versuche es erneut'
	},
	{
		code: 'ERR-016',
		message: 'Du folgst dieser Person bereits. Überprüfe deine Eingaben und versuche es erneut.'
	},
	{
		code: 'ERR-017',
		message: 'Du kannst dir selbst nicht folgen. Überprüfe deine Eingaben und versuche es erneut.'
	},
	{
		code: 'ERR-018',
		message:
			'Du kannst nur deine eigenen Abonnements verwalten. Überprüfe deine Eingaben und versuche es erneut.'
	},
	{
		code: 'ERR-019',
		message:
			'Du kannst nur deine eigenen Posts verwalten. Überprüfe deine Eingaben und versuche es erneut.'
	},
	{
		code: 'ERR-020',
		message: 'Der Post wurde nicht gefunden. Bitte überprüfe deine Eingaben und versuche es erneut.'
	},
	{
		code: 'ERR-021',
		message: 'Dieser Post wurde bereits geliked.'
	},
	{
		code: 'ERR-022',
		message: 'Dieser Post wurde noch nicht geliked.'
	},
	{
		code: 'ERR-023',
		message: 'Die Benachrichtigung wurde nicht gefunden. Bitte versuche es erneut.'
	},
	{
		code: 'ERR-024',
		message: 'Du kannst nur deine eigenen Benachrichtigungen löschen. Bitte versuche es erneut.'
	},
	{
		code: 'ERR-025',
		message:
			'Der Passwort-Reset-Token ist ungültig oder abgelaufen. Bitte fordere einen neuen Token an und versuche es erneut.'
	},
	{
		code: 'ERR-026',
		message: 'Der Chat existiert bereits. Bitte überprüfe den Benutzernamen und versuche es erneut.'
	},
	{
		code: 'ERR-027',
		message: 'Der Chat wurde nicht gefunden. Bitte versuche es erneut.'
	},
	{
		code: 'ERR-100',
		message: 'Bitte laden Sie nur eine Datei hoch'
	},
	{
		code: 'ERR-101',
		message: 'Es sind nur die Dateiformate JPG, JPEG und WebP erlaubt.' //Change Text for Push Notification SVG Image and take changes in Post.ts and filedropzone.svelte
	},
	{
		code: 'ERR-102',
		message: 'Die Dateigröße darf 5MB nicht überschreiten, deine Datei ist zu groß.'
	}
];

/**
 * Returns the error message for a given error code.
 *
 * @param code The error code.
 * @param hasNoToast Whether the error should be displayed as a toast.
 * @returns The error message.
 */
export function getErrorMessage(code: string, hasNoToast: boolean): string {
	handleUnauthorized(code, hasNoToast);
	const error: Error | undefined = errorMessages.find((error) => {
		return error.code === code;
	});
	if (error) {
		return error.message;
	}
	return 'Ein unbekannter Fehler ist aufgetreten. Bitte versuche es später erneut.';
}

/**
 * Handles unauthorized requests.
 *
 * @param code The error code.
 * @param hasNoToast Whether the error should be displayed as a toast.
 */
function handleUnauthorized(code: string, hasNoToast: boolean) {
	if (code === 'ERR-014' && !hasNoToast) {
		redirectToLogin2.set(true);
	} else if (code === 'ERR-014' && hasNoToast) {
		redirectToLogin1.set(true);
	}
}
