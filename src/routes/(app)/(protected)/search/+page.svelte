<script lang="ts">
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { Error, ErrorObject, ErrorResponse, Follower } from '$domains';
	import type { PostData, PostWithRepost, SearchParams, UserSearch } from '$domains';
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
	let searchTerm: string = '';
	let chipString: string = '';
	let tabSet: number = globalConfig.postTab;
	let isError: boolean = false;
	let error: Error;
	let main: HTMLElement;
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
		main.scrollIntoView();
		const urlParams = new URLSearchParams(window.location.search);
		urlProps = {
			q: urlParams.get('q') ? urlParams.get('q') : '',
			username: urlParams.get('username') ? urlParams.get('username') : '',
			offset: 0
		};
		if (urlProps.username) {
			searchTerm = urlProps.username;
			tabSet = globalConfig.userTab;
		} else if (urlProps.q) {
			searchTerm = urlProps.q;
			tabSet = globalConfig.postTab;
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
	const getSearch = async (tab: number, searchQuery: string, offset: number, limit: string) => {
		if (tab === globalConfig.postTab) {
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
			const response = await searchUsers(searchTerm, urlProps.offset);
			handleUsers({
				...response,
				records: 'error' in response ? [...userSearch] : [...userSearch, ...response.records]
			});
		}
	}
	async function loadMorePostsSearch() {
		$loading = true;
		urlProps.offset = urlProps.offset + parseInt(globalConfig.limit);
		const response = await searchHashtags(searchTerm, urlProps.offset);
		handleHashtags(response);
		$loading = false;
	}
	async function searchHashtags(hashtag: string, offset: number) {
		goto(`/search?q=${searchTerm}`);
		hashtag = hashtag.startsWith('#') ? hashtag.substring(1) : hashtag;
		const response = await getSearch(tabSet, hashtag, offset, globalConfig.limit);
		return response;
	}
	async function searchUsers(userstring: string, offset: number) {
		goto(`/search?username=${searchTerm}`);
		const response = await getSearch(tabSet, userstring, offset, globalConfig.limit);
		return response.data;
	}
	async function handleHashtags(response: PostData) {
		userSearch = [];
		postSearch.posts = postSearch.posts.concat(response.posts);
		postSearch.overallRecords = response.overallRecords;
	}
	async function handleUsers(response: UserSearch) {
		if (!('error' in response)) {
			userSearch = response.records.map((record) => ({
				followerId: '',
				followingId: '',
				nickname: record.nickname,
				picture: record.picture,
				username: record.username
			}));
			urlProps.offset + parseInt(globalConfig.limit) + 1 < response.pagination.records
				? (lastPage = false)
				: (lastPage = true);
		}
		postSearch.posts = [];
	}
	export async function handleSearch() {
		$loading = true;
		urlProps.offset = 0;
		chipString = searchTerm;
		try {
			if (tabSet === globalConfig.postTab && searchTerm.length > 0) {
				isSearch = true;
				postSearch.posts = [];
				postSearch.overallRecords = 0;
				const response = await searchHashtags(searchTerm, urlProps.offset);
				handleHashtags(response);
			} else if (tabSet === globalConfig.userTab && searchTerm.length > 0) {
				isSearch = true;
				const response: UserSearch | ErrorResponse = await searchUsers(searchTerm, urlProps.offset);
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

<main bind:this={main}>
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
			nothingFoundMessage={'Keine Posts gefunden'}
			nothingFoundSubMessage={'Sei der erste, der einen Post auf dieser Plattform verfasst!'}
		/>
	{/if}
</main>
