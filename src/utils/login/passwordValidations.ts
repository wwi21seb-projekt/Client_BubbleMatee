export function determineIconType(
	passwordsMatch: boolean,
	isRepeatPassword: boolean,
	passwordValid: boolean
) {
	function isInputValid(
		passwordsMatch: boolean,
		isRepeatPassword: boolean,
		passwordValid: boolean
	) {
		return (!isRepeatPassword && passwordValid) || (isRepeatPassword && passwordsMatch);
	}

	return isInputValid(passwordsMatch, isRepeatPassword, passwordValid);
}

export function passwordLongEnough(password: string): boolean {
	if (!password) {
		return false;
	}
	return password.length >= 8;
}

export function containsSmallLetter(password: string): boolean {
	if (!password) {
		return false;
	}
	return /[a-z]/.test(password);
}

export function containsSpecialCharacter(password: string): boolean {
	return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
}

export function containsNumber(password: string): boolean {
	return /[\d]/.test(password);
}

export function containsBigLetter(password: string): boolean {
	return /[A-Z]/.test(password);
}

export function passwordsMatch(password: string, passwordRepeat: string): boolean {
	return password === passwordRepeat;
}

export function passwordValid(password: string): boolean {
	return (
		passwordLongEnough(password) &&
		containsSmallLetter(password) &&
		containsSpecialCharacter(password) &&
		containsNumber(password) &&
		containsBigLetter(password)
	);
}
