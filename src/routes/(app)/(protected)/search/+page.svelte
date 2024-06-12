<script lang="ts">
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type {
		Error,
		ErrorObject,
		ErrorResponse,
		Follower,
		PostData,
		PostWithRepost,
		SearchParams,
		UserSearch
	} from '$domains';
	import { goto } from '$app/navigation';
	import { Feed, SearchTabs, SearchBar } from '$components';
	import {
		fetchNextPostsFeed,
		loadSearchedUser,
		searchPostByHashtag,
		globalConfig,
		getErrorMessage
	} from '$utils';
	import { onMount } from 'svelte';
	import { loading } from '$stores';
	export let data: PostData | ErrorObject;
	const toastStore = getToastStore();
	const POSTTAB = 0;
	const USERTAB = 1;
	let searchTerm: string = '';
	let chipString: string = '';
	let tabSet: number = POSTTAB;
	let isError: boolean = false;
	let error: Error;
	let userSearch: Array<Follower> = [];
	let postSearch: PostData = {
		posts: new Array<PostWithRepost>(),
		overallRecords: 0,
		lastPostId: ''
	};
	let isSearch: boolean = userSearch.length > 0 || postSearch.posts.length > 0;
	let urlProps: SearchParams;
	let lastPage: boolean = true;
	let postDataGlobaleFeed: PostData = {
		posts: new Array<PostWithRepost>(),
		overallRecords: 0,
		lastPostId: ''
	};
	handleLoadResult(data);
	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		urlProps = {
			q: urlParams.get('q') ? urlParams.get('q') : '',
			username: urlParams.get('username') ? urlParams.get('username') : '',
			offset: 0
		};
		if (urlProps.username) {
			searchTerm = urlProps.username;
			tabSet = USERTAB;
		} else if (urlProps.q) {
			searchTerm = urlProps.q;
			tabSet = POSTTAB;
		}
		handleSearch();
	});
	function handleLoadResult(data: PostData | ErrorObject): void {
		if ('posts' in data) {
			postDataGlobaleFeed.posts = postDataGlobaleFeed.posts.concat(data.posts);
			postDataGlobaleFeed.overallRecords = data.overallRecords;
			postDataGlobaleFeed.lastPostId = data.lastPostId!;
		} else {
			const t: ToastSettings = {
				message: getErrorMessage(data.error.code, false),
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		}
	}
	const getSearch = async (searchQuery: string, offset: number, limit: string) => {
		if (tabSet === POSTTAB) {
			const body: ErrorObject | PostData = await searchPostByHashtag(searchQuery, offset, limit);
			isError = 'error' in body;
			if ('error' in body) {
				error = body.error;
			}
			return body;
		} else {
			const body = await loadSearchedUser(searchQuery, offset, limit);
			isError = body.error;
			error = body.data.error;
			return body;
		}
	};
	async function loadMoreUsers() {
		if (urlProps.offset !== null) {
			urlProps.offset = urlProps.offset + parseInt(globalConfig.limit);
			const response = await searchUsers();
			handleUsers({ ...response, records: [...userSearch, ...response.records] });
		}
	}
	async function loadMorePostsSearch() {
		$loading = true;
		urlProps.offset = urlProps.offset + parseInt(globalConfig.limit);
		const response = await searchHashtags();
		handleHashtags(response);
		$loading = false;
	}
	async function searchHashtags() {
		goto(`/search?q=${searchTerm}`);
		const response = await getSearch(searchTerm, urlProps.offset, globalConfig.limit);
		return response;
	}
	async function searchUsers() {
		goto(`/search?username=${searchTerm}`);
		const response = await getSearch(searchTerm, urlProps.offset, globalConfig.limit);
		return response.data;
	}
	async function handleHashtags(response: PostData) {
		userSearch = [];
		postSearch.posts = postSearch.posts.concat(response.posts);
		postSearch.overallRecords = response.overallRecords;
	}
	async function handleUsers(response: UserSearch) {
		userSearch = response.records.map((record) => ({
			followerId: '',
			followingId: '',
			nickname: record.nickname,
			profilePictureUrl: record.profilePictureUrl,
			username: record.username
		}));
		postSearch.posts = [];
		urlProps.offset + parseInt(globalConfig.limit) + 1 < response.pagination.records
			? (lastPage = false)
			: (lastPage = true);
	}
	export async function handleSearch() {
		$loading = true;
		urlProps.offset = 0;
		chipString = searchTerm;
		try {
			if (tabSet === POSTTAB && searchTerm.length > 0) {
				isSearch = true;
				postSearch.posts = [];
				postSearch.overallRecords = 0;
				const response = await searchHashtags();
				handleHashtags(response);
			} else if (tabSet === USERTAB && searchTerm.length > 0) {
				isSearch = true;
				const response: UserSearch | ErrorResponse = await searchUsers();
				handleUsers(response as UserSearch);
			} else {
				isSearch = false;
				goto('/search');
			}
		} catch (error) {
			if (error instanceof ErrorEvent) {
				const t: ToastSettings = {
					message: error.type,
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
			}
			isError = true;
		}
		$loading = false;
	}
	//function that can be called from the post component to trigger the loading of more posts
	async function loadMorePosts() {
		$loading = true;
		const data: PostData | ErrorObject = await fetchNextPostsFeed(
			postDataGlobaleFeed.lastPostId!,
			globalConfig.limit,
			'global'
		);
		handleLoadResult(data);
		$loading = false;
	}
</script>

<div class="flex justify-center m-0 sticky top-0 z-40 p-4 bg-surface-50 dark:bg-surface-900">
	<SearchBar {handleSearch} bind:searchTerm />
</div>
{#if isSearch}
	<SearchTabs
		bind:tabSet
		bind:lastPage
		{handleSearch}
		{loadMoreUsers}
		{loadMorePostsSearch}
		{POSTTAB}
		{USERTAB}
		{isError}
		{error}
		{postSearch}
		{userSearch}
		{chipString}
	/>
{:else}
	<Feed
		postData={postDataGlobaleFeed}
		{loadMorePosts}
		nothingFoundMessage={'Keine Post gefunden'}
		nothingFoundSubMessage={'Sei der erste, der einen Post auf dieser Plattform verfasst!'}
	/>
{/if}
