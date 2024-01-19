import type { JwtPayload } from 'jwt-decode';

export interface TokenPayload extends JwtPayload {
	iss: string;
	iat: number;
	exp: number;
	sub: string;
	username: string;
}
