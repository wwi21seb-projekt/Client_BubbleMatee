/**
 * Determines the appropriate icon type based on password-related criteria.
 *
 * @param passwordsMatch Indicates if the passwords match.
 * @param isRepeatPassword Indicates if the input is for repeating the password.
 * @param passwordValid Indicates if the password is valid based on various criteria.
 * @returns The determined icon type based on the input criteria.
 */
export function determineIconType(
	passwordsMatch: boolean,
	isRepeatPassword: boolean,
	passwordValid: boolean
) {
	/**
	 * Checks the validity of password-related input.
	 *
	 * @param passwordsMatch Indicates if the passwords match.
	 * @param isRepeatPassword Indicates if the input is for repeating the password.
	 * @param passwordValid Indicates if the password is valid based on various criteria.
	 * @returns true if the input is valid; otherwise, false.
	 */
	function isInputValid(
		passwordsMatch: boolean,
		isRepeatPassword: boolean,
		passwordValid: boolean
	) {
		return (!isRepeatPassword && passwordValid) || (isRepeatPassword && passwordsMatch);
	}

	return isInputValid(passwordsMatch, isRepeatPassword, passwordValid);
}

/**
 * Checks if a password is long enough.
 *
 * @param password The password to be checked.
 * @returns true if the password is long enough; otherwise, false.
 */
export function passwordLongEnough(password: string): boolean {
	if (!password) {
		return false;
	}
	return password.length >= 8;
}

/**
 * Checks if a password contains a small letter.
 *
 * @param password The password to be checked.
 * @returns true if the password contains a small letter; otherwise, false.
 */
export function containsSmallLetter(password: string): boolean {
	if (!password) {
		return false;
	}
	return /[a-z]/.test(password);
}

/**
 * Checks if a password contains a special character.
 *
 * @param password The password to be checked.
 * @returns true if the password contains a special character; otherwise, false.
 */
export function containsSpecialCharacter(password: string): boolean {
	return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
}

/**
 * Checks if a password contains a number.
 *
 * @param password The password to be checked.
 * @returns true if the password contains a number; otherwise, false.
 */
export function containsNumber(password: string): boolean {
	return /[\d]/.test(password);
}

/**
 * Checks if a password contains a capital letter.
 *
 * @param password The password to be checked.
 * @returns true if the password contains a capital letter; otherwise, false.
 */
export function containsBigLetter(password: string): boolean {
	return /[A-Z]/.test(password);
}

/**
 * Checks if two passwords match.
 *
 * @param password The first password.
 * @param passwordRepeat The repeated password to be compared.
 * @returns true if the passwords match; otherwise, false.
 */
export function passwordsMatch(password: string, passwordRepeat: string): boolean {
	return password === passwordRepeat;
}

/**
 * Checks if a password is valid based on various criteria.
 *
 * @param password The password to be checked.
 * @returns true if the password is valid; otherwise, false.
 */
export function passwordValid(password: string): boolean {
	return (
		passwordLongEnough(password) &&
		containsSmallLetter(password) &&
		containsSpecialCharacter(password) &&
		containsNumber(password) &&
		containsBigLetter(password)
	);
}
