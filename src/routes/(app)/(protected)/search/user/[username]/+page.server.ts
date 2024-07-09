import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type {
	ErrorObject,
	ErrorResponse,
	PostData,
	UserDataWithPosts,
	UserInfoResponse
} from '$domains';
import { fetchFirstPostsUser, globalConfig, loadUser } from '$utils';

/**
 * Handles the server-side loading for the myProfile page.
 *
 * @param event The SvelteKit server load event.
 * @returns The response containing user data or an error.
 */
export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const username: string = event.params.username as string;
	const userData: UserInfoResponse | ErrorResponse = await loadUser(event);
	const postData: ErrorObject | PostData = await fetchFirstPostsUser(
		event,
		'0',
		globalConfig.limit,
		username
	);
	const data: UserDataWithPosts = {
		userData,
		postData
	};
	return data;
};
