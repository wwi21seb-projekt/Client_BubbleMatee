import type {
	Error,
	ErrorResponse,
	Feed,
	FeedResponse,
	Post,
	PostData,
	UserFeed,
	UserInfo
} from '$domains';
import type { UserFeedResponse } from '$domains/ServerResponses';
import { getErrorMessage } from '$utils';

/**
 * Loads the next posts from the feed endpoint
 *
 * @param lastPostID - the ID of the last Post that has already been fetched
 * @param limit - the maximum number of posts that should be fetched
 * @param type - Feed-Type: global or personal
 * @returns a PostData-Object consisting of an Array with the next post and additional information needed to load the next page
 * @throws an error: type = Error code
 */ export async function fetchNextPostsFeed(
	lastPostID: string,
	limit: string,
	type: string
): Promise<PostData> {
	const lastPostIDString = lastPostID === '' ? '' : `postId=${lastPostID}&`;
	const response = await fetch(`/api/feed?${lastPostIDString}limit=${limit}&feedType=${type}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const body: ErrorResponse | FeedResponse = await response.json();
	if (body.error) {
		//handle Error
		const error: Error = (body as ErrorResponse).data.error;
		const message = getErrorMessage(error.code);
		throw new ErrorEvent(message);
	} else {
		const feedData: Feed = (body as FeedResponse).data;
		//map the feed-data to a Post-Array with new Posts
		const newPosts: Array<Post> = feedData.records.map((record) => ({
			postId: record.postId,
			author: record.author,
			date: new Date(record.creationDate),
			content: record.content
		}));
		const postdata: PostData = {
			posts: newPosts,
			overallRecords: feedData.pagination.records,
			lastPostId: feedData.pagination.lastPostId
		};
		return postdata;
	}
}

/**
 * Loads the next posts from the user-feed endpoint
 *
 * @param lastPostID - the ID of the last Post that has already been fetched
 * @param limit - the maximum number of posts that should be fetched
 * @param type - Feed-Type: global or personal
 * @returns a PostData-Object consisting of an Array with the next post and additional information needed to load the next page
 * @throws an error: type = Error code
 */ export async function fetchNextPostsUser(
	offset: string,
	limit: string,
	user: UserInfo
): Promise<PostData> {
	const response = await fetch(`/api/users/${user.username}/feed?limit=${limit}&offset=${offset}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const body: ErrorResponse | UserFeedResponse = await response.json();
	if (body.error) {
		//handle Error
		const error: Error = (body as ErrorResponse).data.error;
		const message = getErrorMessage(error.code);
		throw new ErrorEvent(message);
	} else {
		const feedData: UserFeed = (body as UserFeedResponse).data;
		//map the feed-data to a Post-Array with new Posts
		const newPosts: Array<Post> = feedData.records.map((record) => ({
			postId: record.postId,
			author: {
				username: user.username,
				nickname: user.nickname,
				profilePictureUrl: user.profilePictureUrl
			},
			date: new Date(record.creationDate),
			content: record.content
		}));
		const postdata: PostData = {
			posts: newPosts,
			overallRecords: feedData.pagination.records
		};
		return postdata;
	}
}
