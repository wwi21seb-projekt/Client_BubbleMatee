import { jwtDecode, type JwtPayload } from 'jwt-decode';

export function tokenExpired(token: string) {
	const decodedToken = jwtDecode(token);
	const currentTime = Math.floor(Date.now() / 1000);

	return decodedToken.exp && decodedToken.exp < currentTime;
}
