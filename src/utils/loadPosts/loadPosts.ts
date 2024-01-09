import type { Error, ErrorResponse, Feed, FeedResponse, Post, PostData } from '$domains';
import { getErrorMessage } from '$utils';

//function to fetch more posts
export async function fetchNextPosts(
	lastPostID: string,
	limit: string,
	type: string
): Promise<PostData> {
	const response = await fetch(`/api/feed?postId=${lastPostID}&limit=${limit}&feedType=${type}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const body: ErrorResponse | FeedResponse = await response.json();
	if (body.error) {
		console.log(body);
		//handle Error
		const error: Error = (body as ErrorResponse).data;
		const  message = getErrorMessage(error.code);
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
