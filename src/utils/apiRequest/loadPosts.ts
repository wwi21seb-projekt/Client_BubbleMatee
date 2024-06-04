import type { ErrorResponse, Feed, FeedResponse, PostData, PostWithRepost } from '$domains';
import type { ErrorObject } from '$domains/ServerResponses';
import type { ServerLoadEvent } from '@sveltejs/kit';
/**
 * Loads the first posts from the feed endpoint
 *
 * @param event - The ServerLoadEvent
 * @param lastPostID - the ID of the last Post that has already been fetched
 * @param limit - the maximum number of posts that should be fetched
 * @param type - Feed-Type: global or personal
 * @returns a PostData-Object consisting of an Array with the next post and additional information needed to load the next page
 * @throws an error: type = Error code
 */ export async function fetchFirstPostsFeed(
	event: ServerLoadEvent,
	lastPostID: string,
	limit: string,
	type: string
): Promise<PostData | ErrorObject> {
	const lastPostIDString = lastPostID === '' ? '' : `postId=${lastPostID}&`;
	const response = await event.fetch(
		`/api/feed?${lastPostIDString}limit=${limit}&feedType=${type}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	const body: ErrorResponse | FeedResponse = await response.json();
	return handleFeedResponse(body);
}

/**
 * Loads the next posts from the feed endpoint
 * @param lastPostID - the ID of the last Post that has already been fetched
 * @param limit - the maximum number of posts that should be fetched
 * @param type - Feed-Type: global or personal
 * @returns a PostData-Object consisting of an Array with the next post and additional information needed to load the next page
 * @throws an error: type = Error code
 */ export async function fetchNextPostsFeed(
	lastPostID: string,
	limit: string,
	type: string
): Promise<PostData | ErrorObject> {
	const lastPostIDString = lastPostID === '' ? '' : `postId=${lastPostID}&`;
	const response = await fetch(`/api/feed?${lastPostIDString}limit=${limit}&feedType=${type}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const body: ErrorResponse | FeedResponse = await response.json();
	return handleFeedResponse(body);
}

/**
 * Loads the posts by searchterm
 * @param searchQuery - searchterm for hashtags
 * @param limit - the maximum number of posts that should be fetched
 * @param offset - start of the page
 * @returns a PostData-Object consisting of an Array with the next post and additional information needed to load the next page
 * @throws an error: type = Error code */
export async function searchPostByHashtag(
	searchQuery: string,
	offset: number,
	limit: string
): Promise<PostData | ErrorObject> {
	const response = await fetch(`/api/posts?q=${searchQuery}&offset=${offset}&limit=${limit}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await response.json();
	if (body.error) {
		//handle Error
		const data = body.data as ErrorObject;
		return data;
	} else {
		//map the feed-data to a Post-Array with new Posts
		const mappedRecords: Array<PostWithRepost> = body.data.records.map(
			(record: PostWithRepost) => ({
				...record,
				creationDate: new Date(record.creationDate),
				repost: record.repost
					? {
							...record.repost,
							creationDate: new Date(record.repost.creationDate)
						}
					: undefined
			})
		);
		const postdata: PostData = {
			posts: mappedRecords,
			overallRecords: body.data.pagination.records,
			lastPostId: body.data.pagination.lastPostId
		};
		return postdata;
	}
}
function handleFeedResponse(body: ErrorResponse | FeedResponse): ErrorObject | PostData {
	if (body.error) {
		//handle Error
		const data = body.data as ErrorObject;
		return data;
	} else {
		const feedData: Feed = (body as FeedResponse).data;
		const mappedRecords: Array<PostWithRepost> = feedData.records.map((record: PostWithRepost) => ({
			...record,
			creationDate: new Date(record.creationDate),
			repost: record.repost
				? {
						...record.repost,
						creationDate: new Date(record.repost.creationDate)
					}
				: undefined
		}));
		const postdata: PostData = {
			posts: mappedRecords,
			overallRecords: feedData.pagination.records,
			lastPostId: feedData.pagination.lastPostId
		};
		return postdata;
	}
}
