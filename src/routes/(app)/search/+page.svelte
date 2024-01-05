<script lang="ts">
	import { Posts } from '$components';
	import type { Error, ErrorResponse, Feed, FeedResponse, Post } from '$domains';
	import { isLoggedIn } from '$stores';
	import { getErrorMessage } from '$utils';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	//TODO: What is the query for the first POST?
	// lastPostID -> The ID of the last Post -> is needed to load the next posts
	let lastPostID: string = '0';
	//TODO: Where can we set the limit globally?
	let limit: string = '10';
	// lastPage -> are there more posts that can be loaded?
	let lastPage: boolean = true;
	let posts: Array<Post> = new Array<Post>();
	//load the first posts directly
	onMount(() => {
		loadMorePosts();
	});

	//function that can be called from the post component to trigger the loading of more posts
	function loadMorePosts() {
		fetchNextPosts().then((data) => {
			posts = posts.concat(data);
		});
	}

	//function to fetch more posts
	async function fetchNextPosts(): Promise<Array<Post>> {
		const response = await fetch(
			`/api/feed?postId=${lastPostID}&limit=${limit}&feedType=${
				$isLoggedIn ? 'personal' : 'global'
			}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		const body: ErrorResponse | FeedResponse = await response.json();
		if (body.error) {
			//handle Error
			let error: Error = (body as ErrorResponse).data;
			const t: ToastSettings = {
				message: getErrorMessage(error.code),
				background: 'variant-filled-error'
			};
			const toastStore = getToastStore();
			toastStore.trigger(t);
			return new Array<Post>();
		} else {
			let feedData: Feed = (body as FeedResponse).data;
			//Update variables lastPostID and lastPage
			// TODO -> berprüfen ob das verständnis für limit und records richtig ist
			lastPostID = feedData.pagination.lastPostId;
			lastPage = feedData.pagination.limit > feedData.pagination.records;
			//map the feed-data to a Post-Array with new Posts
			let newPosts: Array<Post> = feedData.records.map((record) => ({
				postId: record.postId,
				author: record.author,
				date: new Date(record.creationDate),
				content: record.content
			}));
			return newPosts;
		}
	}
</script>

<Posts {posts} {loadMorePosts} {lastPage}></Posts>
