import { jwtDecode, type JwtPayload } from 'jwt-decode';

export function getCurrentUser(token: string): string {
	const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);

	const userId = decodedToken.sub;
	if (userId === undefined) {
		return '';
	}
	return userId;
}
