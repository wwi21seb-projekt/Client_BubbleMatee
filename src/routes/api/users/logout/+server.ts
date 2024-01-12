import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Handles POST requests to logout a user.
 *
 * @param cookies The cookies of the request.
 * @returns The response containing data or an error.
 */
export const POST: RequestHandler = ({ cookies }) => {
	cookies.delete('token', { path: '/' });
	cookies.delete('refreshToken', { path: '/' });

	return json({ success: true });
};
