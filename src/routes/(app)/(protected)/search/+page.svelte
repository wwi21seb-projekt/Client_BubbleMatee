<script lang="ts">
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { Author, FeedSearch, SearchParams, UserSearch } from '$domains';
	import { goto } from '$app/navigation';
	import { Feed, SearchTabs, SearchBar } from '$components';
	import type { Post } from '$domains';
	import { fetchNextPostsFeed, loadSearchedUser, searchPostByHashtag } from '$utils';
	import { globalConfig } from '$utils';
	import { onMount } from 'svelte';

	const toastStore = getToastStore();
	let searchTerm: string = '';
	let tabSet: number;
	let isError: boolean = false;

	let userSearch: Array<Author> = [];
	let postSearch: Array<Post> = [];

	let lastPostID: string = '';
	let lastPage: boolean = true;
	let isSearch: boolean = false;
	let posts: Array<Post> = new Array<Post>();
	let urlProps: SearchParams;

	//load the first posts directly
	onMount(async () => {
		loadMorePosts();
		const urlParams = new URLSearchParams(window.location.search);
		urlProps = {
			q: urlParams.get('q') ? urlParams.get('q') : '',
			username: urlParams.get('username') ? urlParams.get('username') : '',
			offset: 0
		};

		if (urlProps.username) {
			searchTerm = urlProps.username;
			tabSet = USERTAB;
			const response: UserSearch = await searchUsers();
			handleUsers(response);
		} else {
			tabSet = POSTTAB;
		}
	});
	const POSTTAB = 0;
	const USERTAB = 1;

	const getSearch = async (searchQuery: string, offset: number, limit: string) => {
		if (tabSet === POSTTAB) {
			const body = await searchPostByHashtag(searchQuery, offset, limit);
			return body;
		} else {
			const body = await loadSearchedUser(searchQuery, offset, limit);
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
		if (urlProps.offset !== null) {
			urlProps.offset = urlProps.offset + parseInt(globalConfig.limit);
			const response = await searchHashtags();
			handleHashtags({ ...response, records: [...postSearch, ...response.records] });
		}
	}

	async function searchHashtags() {
		goto(`/search?q=${searchTerm}`);
		const response = await getSearch(searchTerm, urlProps.offset, globalConfig.limit);
		return response.data;
	}

	async function searchUsers() {
		goto(`/search?username=${searchTerm}`);
		const response = await getSearch(searchTerm, urlProps.offset, globalConfig.limit);
		return response.data;
	}

	async function handleHashtags(response: FeedSearch) {
		userSearch = [];
		postSearch = response.records;
		if (urlProps.offset !== null) {
			urlProps.offset + parseInt(globalConfig.limit) + 1 < response.pagination.records
				? (lastPage = false)
				: (lastPage = true);
		}
	}

	async function handleUsers(response: UserSearch) {
		userSearch = response.records;
		postSearch = [];
		if (urlProps.offset !== null) {
			urlProps.offset + parseInt(globalConfig.limit) + 1 < response.pagination.records
				? (lastPage = false)
				: (lastPage = true);
		}
	}

	async function handleSearch() {
		urlProps.offset = 0;
		if (tabSet === POSTTAB && searchTerm.length > 0) {
			isSearch = true;
			const response: FeedSearch = await searchHashtags();
			handleHashtags(response);
		} else if (tabSet === USERTAB && searchTerm.length > 0) {
			isSearch = true;
			const response: UserSearch = await searchUsers();
			handleUsers(response);
		} else {
			isSearch = false;
		}
	}

	//function that can be called from the post component to trigger the loading of more posts
	async function loadMorePosts() {
		try {
			const data = await fetchNextPostsFeed(lastPostID, globalConfig.limit, 'global');
			posts = posts.concat(data.posts);
			lastPage = posts.length === data.overallRecords;
			lastPostID = data.lastPostId!;
		} catch (error) {
			if (error instanceof ErrorEvent) {
				const t: ToastSettings = {
					message: error.type,
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
			}
		}
	}
</script>

<div class="flex justify-center sticky top-0 z-40 p-4">
	<SearchBar {handleSearch} bind:searchTerm />
</div>

{#if isSearch}
	<div class="flex justify-center">
		<SearchTabs
			bind:tabSet
			{handleSearch}
			{loadMoreUsers}
			{loadMorePostsSearch}
			{POSTTAB}
			{USERTAB}
			{lastPage}
			{isError}
			{postSearch}
			{userSearch}
		/>
	</div>
{:else}
	<Feed {posts} {loadMorePosts} {lastPage} />
{/if}
