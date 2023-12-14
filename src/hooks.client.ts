import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Authorization header can be added here
	const response = await resolve(event);
	return response;
};
