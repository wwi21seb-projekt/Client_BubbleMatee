import { jwtDecode, type JwtPayload } from 'jwt-decode';

/**
 * Checks if the token has expired.
 *
 * @param token The token to check.
 * @returns Whether the token has expired.
 */
export function tokenExpired(token: string) {
	const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);
	const currentTime = Math.floor(Date.now() / 1000);

	return decodedToken.exp && decodedToken.exp < currentTime;
}