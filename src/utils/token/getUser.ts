import { jwtDecode, type JwtPayload } from 'jwt-decode';

/**
 * Gets the current user from the token.
 *
 * @param token The token to decode.
 * @returns The user ID.
 */
export function getCurrentUser(token: string | undefined): string {
	if (token === undefined) {
		return '';
	}
	const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);

	const userId = decodedToken.sub;
	if (userId === undefined) {
		return '';
	}
	return userId;
}
