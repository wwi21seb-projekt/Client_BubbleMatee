import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	//TODO: Authorization header
	const response = await resolve(event);
	return response;
};
