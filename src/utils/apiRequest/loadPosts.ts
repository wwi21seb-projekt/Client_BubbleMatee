import type {
	Error,
	ErrorResponse,
	Feed,
	FeedResponse,
	PostData,
	PostWithRepost,
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
		const message = getErrorMessage(error.code, false);
		throw new ErrorEvent(message);
	} else {
		const feedData: Feed = (body as FeedResponse).data;
		//map the feed-data to a Post-Array with new Posts
		const newPosts: Array<PostWithRepost> = feedData.records.map((record) =>
			record.repost
				? {
						postId: record.postId,
						author: record.author,
						creationDate: new Date(record.creationDate),
						content: record.content,
						location: record.location,
						likes: record.likes,
						liked: record.liked,
						comments: record.comments,
						repost: {
							...record.repost,
							creationDate: new Date(record.repost?.creationDate)
						}
					}
				: {
						postId: record.postId,
						author: record.author,
						creationDate: new Date(record.creationDate),
						content: record.content,
						location: record.location,
						likes: record.likes,
						liked: record.liked,
						comments: record.comments
					}
		);
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
		const message = getErrorMessage(error.code, false);
		throw new ErrorEvent(message);
	} else {
		const feedData: UserFeed = (body as UserFeedResponse).data;
		//map the feed-data to a Post-Array with new Posts
		const newPosts: Array<PostWithRepost> = feedData.records.map((record) =>
			record.repost
				? {
						postId: record.postId,
						author: {
							username: user.username,
							nickname: user.nickname,
							profilePictureUrl: user.profilePictureUrl
						},
						creationDate: new Date(record.creationDate),
						content: record.content,
						location: record.location,
						likes: record.likes,
						liked: record.liked,
						repost: {
							...record.repost,
							creationDate: new Date(record.repost.creationDate)
						}
					}
				: {
						postId: record.postId,
						author: {
							username: user.username,
							nickname: user.nickname,
							profilePictureUrl: user.profilePictureUrl
						},
						creationDate: new Date(record.creationDate),
						content: record.content,
						location: record.location,
						likes: record.likes,
						liked: record.liked
					}
		);
		const postdata: PostData = {
			posts: newPosts,
			overallRecords: feedData.pagination.records
		};
		return postdata;
	}
}

/**
 * Loads the posts by searchterm
 *
 * @param searchQuery - searchterm for hashtags
 * @param limit - the maximum number of posts that should be fetched
 * @param offset - start of the page
 * @returns a PostData-Object consisting of an Array with the next post and additional information needed to load the next page
 * @throws an error: type = Error code */
export async function searchPostByHashtag(searchQuery: string, offset: number, limit: string) {
	const response = await fetch(`/api/posts?q=${searchQuery}&offset=${offset}&limit=${limit}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await response.json();
	if (body.error) {
		//handle Error
		const error: Error = (body as ErrorResponse).data.error;
		const message = getErrorMessage(error.code, false);
		throw new ErrorEvent(message);
	} else {
		//map the feed-data to a Post-Array with new Posts
		const mappedRecords: Array<PostWithRepost> = body.data.records.map(
			(record: PostWithRepost) => ({
				...record,
				creationDate: new Date(record.creationDate)
			})
		);
		body.data.records = mappedRecords;
		return body;
	}
}
