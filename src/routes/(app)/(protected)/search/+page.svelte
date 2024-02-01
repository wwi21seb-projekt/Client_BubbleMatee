<script lang="ts">
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type {
		Author,
		Error,
		ErrorResponse,
		FeedSearch,
		SearchParams,
		UserSearch
	} from '$domains';
	import { goto } from '$app/navigation';
	import { Feed, SearchTabs, SearchBar } from '$components';
	import type { Post } from '$domains';
	import { fetchNextPostsFeed, loadSearchedUser, searchPostByHashtag, globalConfig } from '$utils';
	import { onMount } from 'svelte';
	import ChipComponent from '$components/search/chip-component.svelte';
	import { loading } from '$stores';
	const toastStore = getToastStore();
	const POSTTAB = 0;
	const USERTAB = 1;
	let searchTerm: string = '';
	let chipString: string = '';
	let tabSet: number = POSTTAB;
	let isError: boolean = false;
	let error: Error;
	let userSearch: Array<Author> = [];
	let postSearch: Array<Post> = [];
	let lastPostID: string = '';
	let lastPage: boolean = true;
	let isSearch: boolean = userSearch.length > 0 || postSearch.length > 0;
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
		} else if (urlProps.q) {
			searchTerm = urlProps.q;
			tabSet = POSTTAB;
		}
		handleSearch();
	});

	const getSearch = async (searchQuery: string, offset: number, limit: string) => {
		if (tabSet === POSTTAB) {
			const body = await searchPostByHashtag(searchQuery, offset, limit);
			isError = body.error;
			error = body.data.error;
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
		if (urlProps.offset !== null) {
			urlProps.offset = urlProps.offset + parseInt(globalConfig.limit);
			const response = await searchHashtags();
			handleHashtags({ ...response, records: [...postSearch, ...response.records] });
		}
		$loading = false;
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
		urlProps.offset + parseInt(globalConfig.limit) + 1 < response.pagination.records
			? (lastPage = false)
			: (lastPage = true);
	}

	async function handleUsers(response: UserSearch) {
		userSearch = response.records;
		postSearch = [];
		urlProps.offset + parseInt(globalConfig.limit) + 1 < response.pagination.records
			? (lastPage = false)
			: (lastPage = true);
	}

	export async function handleSearch() {
		urlProps.offset = 0;
		chipString = searchTerm;
		try {
			if (tabSet === POSTTAB && searchTerm.length > 0) {
				isSearch = true;
				const response: FeedSearch | ErrorResponse = await searchHashtags();

				handleHashtags(response as FeedSearch);
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
	}

	//function that can be called from the post component to trigger the loading of more posts
	async function loadMorePosts() {
		$loading = true;
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
		} finally {
			$loading = false;
		}
	}
</script>

<div class="flex justify-center m-0 sticky top-0 z-40 p-4 bg-surface-50 dark:bg-surface-900">
	<SearchBar {handleSearch} bind:searchTerm />
</div>

{#if isSearch}
	<div
		class="flex justify-center sticky p-4 z-40 bg-surface-50 dark:bg-surface-900"
		style="top: 4.6rem"
	>
		<ChipComponent message={`Sucherergebnisse für ${chipString}`} />
	</div>

	<div class="flex justify-center">
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
		/>
	</div>
{:else}
	<Feed
		{posts}
		{loadMorePosts}
		{lastPage}
		nothingFoundMessage={'Keine Post gefunden'}
		nothingFoundSubMessage={'Sei der erste, der einen Post auf dieser Plattform verfasst!'}
	/>
{/if}
