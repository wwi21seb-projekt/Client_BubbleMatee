import type { Error } from '$domains';

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
		message: 'Der Code ist nicht korrekt. Bitte überprüfe deine Eingaben und versuche es erneut.'
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
		message: 'Der Username wurde bereits aktiviert. Bitte logge dich ein.'
	}
];

/**
 * Returns the error message for a given error code.
 *
 * @param code The error code.
 * @returns The error message.
 */
export function getErrorMessage(code: string): string {
	const error = errorMessages.find((error) => {
		return error.code == code;
	});
	if (error) {
		return error.message;
	}
	return 'Ein unbekannter Fehler ist aufgetreten. Bitte versuche es später erneut.';
}
