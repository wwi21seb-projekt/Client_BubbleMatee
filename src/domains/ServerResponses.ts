import type { Imprint } from './ServerDomains/imprint';
import type { Tokens, User } from './ServerDomains/user';

export interface Response {
	error: boolean;
}

export interface Error {
	code: string;
	message: string;
}

export interface ErrorResponse extends Response {
	data: Error;
}

export interface ImprintResponse extends Response {
	data: Imprint;
}

export interface LoginResponse extends Response {
	data: Tokens;
}

export interface RegisterResponse extends Response {
	data: User;
}
