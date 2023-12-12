import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type dataResponse = {
	error: boolean;
	data: { text: string } | Error;
};

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const response = await event.fetch('/api/imprint', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await response.json();
	return body as unknown as dataResponse;
};
