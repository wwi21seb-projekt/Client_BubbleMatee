import type { ErrorResponse, LoginResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ fetch, request, params }) => {
	const username = params.username;
	console.log(` POST ${PUBLIC_BASE_URL}/api/v1/users/${username}/activate}`);
	const requestBody = await request.json();

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/${username}/activate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		const body = await response.json();

		if (response.ok) {
			return json({ data: body, error: false } as LoginResponse);
		}
		return json({ data: body, error: true } as ErrorResponse);
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
export const DELETE: RequestHandler = async ({ fetch, request, params }) => {
	const username = params.username;
	console.log(` DELETE ${PUBLIC_BASE_URL}/api/v1/users/${username}/activate`);

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/${username}/activate`, {
			method: 'DELETE'
		});

		const body = await response.json();
		return json({ data: body, error: response.ok ? false : true });
	} catch (exception) {
		return json({
			data: {
				error: true,
				errorCode: 500
			},
			errorMessage: 'Internal Server Error'
		});
	}
};
