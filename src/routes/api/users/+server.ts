import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ fetch, request }) => {
	console.log(` POST ${PUBLIC_BASE_URL}/api/v1/users`);
	const requestBody = await request.json();
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
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
