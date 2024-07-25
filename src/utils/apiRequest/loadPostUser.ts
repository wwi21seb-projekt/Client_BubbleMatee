import type { PostData, ErrorObject, ErrorResponse, UserFeed, PostWithRepost } from '$domains';
import type { UserFeedResponse } from '$domains/ServerResponses';
import type { ServerLoadEvent } from '@sveltejs/kit';

/**
 * Loads the first posts from the user-feed endpoint
 * @param lastPostID - the ID of the last Post that has already been fetched
 * @param limit - the maximum number of posts that should be fetched
 * @param type - Feed-Type: global or personal
 * @returns a PostData-Object consisting of an Array with the next post and additional information needed to load the next page
 * @throws an error: type = Error code
 */ export async function fetchFirstPostsUser(
	event: ServerLoadEvent,
	offset: string,
	limit: string,
	user: string
): Promise<PostData | ErrorObject> {
	const response: Response = await event.fetch(
		`/api/users/${user}/feed?limit=${limit}&offset=${offset}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	const body: ErrorResponse | UserFeedResponse = await response.json();
	return handleUserFeedResponse(body);
}
/**
 * Loads the next posts from the user-feed endpoint
 * @param lastPostID - the ID of the last Post that has already been fetched
 * @param limit - the maximum number of posts that should be fetched
 * @param type - Feed-Type: global or personal
 * @returns a PostData-Object consisting of an Array with the next post and additional information needed to load the next page
 * @throws an error: type = Error code
 */ export async function fetchNextPostsUser(
	offset: string,
	limit: string,
	user: string
): Promise<PostData | ErrorObject> {
	const response: Response = await fetch(
		`/api/users/${user}/feed?limit=${limit}&offset=${offset}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	const body: ErrorResponse | UserFeedResponse = await response.json();
	return handleUserFeedResponse(body);
}
function handleUserFeedResponse(body: ErrorResponse | UserFeedResponse): ErrorObject | PostData {
	if (body.error) {
		//handle Error
		const data: ErrorObject = body.data as ErrorObject;
		return data;
	} else {
		const feedData: UserFeed = (body as UserFeedResponse).data;
		//map the feed-data to a Post-Array with new Posts
		const mappedRecords: Array<PostWithRepost> = feedData.records.map((record: PostWithRepost) => ({
			...record,
			creationDate: new Date(record.creationDate),
			author: {
				username: '',
				nickname: '',
				profilePictureUrl: ''
			},
			repost: record.repost
				? {
						...record.repost,
						creationDate: new Date(record.repost.creationDate)
					}
				: undefined
		}));
		const postdata: PostData = {
			posts: mappedRecords,
			overallRecords: feedData.pagination.records
		};
		return postdata;
	}
}
