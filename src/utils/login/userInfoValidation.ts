import { XMark, Check } from '@steeze-ui/heroicons';

/**
 * Checks if a string contains a space character.
 *
 * @param str The input string to be checked.
 * @returns true if the string contains a space; otherwise, false.
 */
function containsSpace(str: string): boolean {
	return str.includes(' ');
}

/**
 * Checks if a string contains special characters.
 *
 * @param str The input string to be checked.
 * @returns true if the string contains special characters; otherwise, false.
 */
function cointainsSpecialChar(str: string): boolean {
	return /[!@#$%^&*(),.?":{}|<>]/g.test(str);
}

/**
 * Validates if a username is valid based on certain criteria.
 *
 * @param username The username to be validated.
 * @returns true if the username is valid; otherwise, false.
 */
export function isValidUsername(username: string): boolean {
	return (
		!containsSpace(username) &&
		!cointainsSpecialChar(username) &&
		username.length <= 20 &&
		username.length >= 1
	);
}

/**
 * Validates if a nickname is valid based on its length.
 *
 * @param nickname The nickname to be validated.
 * @returns true if the nickname is valid; otherwise, false.
 */
export function isValidNickname(nickname: string): boolean {
	return nickname.length <= 25;
}

/**
 * Validates if an email address is valid based on a simple pattern and length criteria.
 *
 * @param email The email address to be validated.
 * @returns true if the email address is valid; otherwise, false.
 */
export function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 128;
}

/**
 * Determines the appropriate icon type based on a validation function and a message.
 *
 * @param message The input message to be validated.
 * @param validation The validation function that returns a boolean indicating the validity of the message.
 * @returns The icon type (typeof XMark or typeof Check) or undefined if the message is empty.
 */
export function getUserInfoIcons(
	message: string,
	validation: (str: string) => boolean
): typeof XMark | typeof Check | undefined {
	if (message !== '' && validation(message)) {
		return Check;
	} else {
		return XMark;
	}
}

/**
 * Determines the appropriate color class based on a validation function and a message.
 *
 * @param message The input message to be validated.
 * @param validation The validation function that returns a boolean indicating the validity of the message.
 * @returns A CSS color class string ('text-success-500' or 'text-error-500') or undefined if the message is empty.
 */
export function getUserInfoColors(
	message: string,
	validation: (str: string) => boolean
): string | undefined {
	if (message !== '' && validation(message)) {
		return 'text-success-500';
	} else {
		return 'text-error-500';
	}
}
