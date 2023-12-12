import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch }) => {
	console.log(` GET ${PUBLIC_BASE_URL}/api/v1/imprint`);
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/imprint`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const body = await response.json();
		return json({ data: body, error: response.ok ? false : true });
	} catch (exception) {
		return json({
			data: {
				error: true,
				errorCode: '500'
			},
			errorMessage: 'Internal Server Error'
		});
	}
};
