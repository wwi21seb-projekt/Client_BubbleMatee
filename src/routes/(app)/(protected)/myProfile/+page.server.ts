import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type {
	ErrorObject,
	ErrorResponse,
	PostData,
	UserDataWithPosts,
	UserInfoResponse
} from '$domains';
import { fetchFirstPostsUser, getCurrentUser, globalConfig } from '$utils';

/**
 * Handles the server-side loading for the myProfile page.
 *
 * @param event The SvelteKit server load event.
 * @returns The response containing user data or an error.
 */
export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const username: string = getCurrentUser(event.cookies.get('token'));
	const responseUser = await event.fetch(`/api/users/${username}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const userData: UserInfoResponse | ErrorResponse = await responseUser.json();
	const postData: ErrorObject | PostData = await fetchFirstPostsUser(
		event,
		'0',
		globalConfig.limit,
		username
	);
	const data: UserDataWithPosts = {
		userData: userData,
		postData: postData
	};
	return data;
};
