import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles DELETE requests to unfollow a user.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param params The params object containing the subscriptionId.
 * @returns The response containing follow data or an error.
 */
export const DELETE: RequestHandler = async ({ fetch, params }) => {
	const subscriptionId = params.subscriptionId;
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/subscriptions/${subscriptionId}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			return json({ data: {}, error: false });
		}
		return json({
			data: {
				error: {
					code: response.status.toString(),
					message: getErrorMessage(response.status.toString())
				}
			},
			error: true
		});
	} catch (exception) {
		return json({
			error: true,
			data: {
				code: '500',
				message: 'Internal Server Error'
			}
		});
	}
};
