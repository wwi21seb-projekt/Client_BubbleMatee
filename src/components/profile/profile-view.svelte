<script lang="ts">
	import { ProfileHeader } from '$components';
	import { ErrorAlert } from '$components';
	import type {
		ErrorObject,
		ErrorResponse,
		Picture,
		PostData,
		PostWithRepost,
		UserInfo,
		UserInfoResponse
	} from '$domains';
	import { ProfilePosts } from '$components';
	import { fetchNextPostsUser, getErrorMessage, globalConfig } from '$utils';
	import { onMount } from 'svelte';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { loading } from '$stores';

	export let userData: UserInfoResponse | ErrorResponse;
	export let loadedPostData: PostData | ErrorObject;
	let postData: PostData = {
		posts: new Array<PostWithRepost>(),
		overallRecords: 0,
		lastPostId: ''
	};
	$: user = userData.error ? null : (userData.data as UserInfo);
	$: error = userData.error ? (userData.data as ErrorObject) : null;
	$: {
		postData = {
			posts: new Array<PostWithRepost>(),
			overallRecords: 0,
			lastPostId: ''
		};
		handleLoadResult(loadedPostData);
	}
	let errorMessage: string = '';
	onMount(() => {
		errorMessage = error ? getErrorMessage(error.error.code, true) : '';
	});

	function notifyDeletedPost(): void {
		if (user) {
			user.posts = user.posts - 1;
		}
	}

	const toastStore = getToastStore();
	function handleLoadResult(data: PostData | ErrorObject): void {
		if ('posts' in data) {
			if (user) {
				enrichPostsWithAuthor(data.posts, user.username, user.nickname, user.picture);
			}
			postData.posts = postData.posts.concat(data.posts);
			postData.overallRecords = data.overallRecords;
		} else {
			const t: ToastSettings = {
				message: data.error.code,
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		}
	}

	//function that can be called from the post component to trigger the loading of more posts
	async function loadMorePosts(): Promise<void> {
		$loading = true;
		const newPosts: PostData | ErrorObject = await fetchNextPostsUser(
			`${postData.posts.length}`,
			globalConfig.limit,
			user!.username
		);
		handleLoadResult(newPosts);
		$loading = false;
	}

	function enrichPostsWithAuthor(
		posts: Array<PostWithRepost>,
		username: string,
		nickname: string,
		picture: Picture | undefined
	): void {
		posts.forEach((post) => {
			post.author = {
				username: username,
				nickname: nickname,
				picture: picture
			};
		});
	}
</script>

{#if user}
	<ProfileHeader bind:user />
	<ProfilePosts {postData} username={user.username} {notifyDeletedPost} {loadMorePosts}
	></ProfilePosts>
{:else if error}
	<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
		<ErrorAlert message={errorMessage} />
	</main>
{/if}
