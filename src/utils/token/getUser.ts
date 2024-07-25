import type { TokenPayload } from '$domains';
import { jwtDecode } from 'jwt-decode';

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
	const decodedToken: TokenPayload = jwtDecode<TokenPayload>(token);

	const username: string | undefined = decodedToken.username;
	if (username === undefined) {
		return '';
	}
	return username;
}
