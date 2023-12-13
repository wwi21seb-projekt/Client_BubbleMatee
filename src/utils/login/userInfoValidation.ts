import { XMark, Check, QuestionMarkCircle } from '@steeze-ui/heroicons';

function containsSpace(str: string): boolean {
	return str.includes(' ');
}

function cointainsSpecialChar(str: string): boolean {
	return /[!@#$%^&*(),.?":{}|<>]/g.test(str);
}

export function isValidUsername(username: string): boolean {
	return !containsSpace(username) && !cointainsSpecialChar(username) && username.length <= 20;
}

export function isValidNickname(nickname: string): boolean {
	return nickname.length <= 25;
}

export function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 128;
}

export function getUserInfoIcons(message: string, validation: (str: string) => boolean) {
	if (message === '') {
		return;
	} else if (validation(message)) {
		return Check;
	} else {
		return XMark;
	}
}

export function getUserInfoColors(message: string, validation: (str: string) => boolean) {
	if (message === '') {
		return;
	} else if (validation(message)) {
		return 'text-success-500';
	} else {
		return 'text-error-500';
	}
}
