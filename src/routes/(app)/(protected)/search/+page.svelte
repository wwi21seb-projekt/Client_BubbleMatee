<script lang="ts">
	import { DevicePhoneMobile, MagnifyingGlass, User } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Tab, TabGroup, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { Author, SearchParams, UserSearch } from '$domains';
	import { goto } from '$app/navigation';
	import { PostTab, Posts, UserTab } from '$components';
	import type { Post } from '$domains';
	import { fetchNextPostsFeed } from '$utils';
	import { globalConfig } from '$utils';
	import { onMount } from 'svelte';

	const toastStore = getToastStore();
	let searchTerm: string = '';
	let tabSet: number;
	let isError: boolean = false;

	let userSearch: Array<Author> = [];
	let postSearch = [];

	let lastPostID: string = '';
	let lastPage: boolean = true;
	let posts: Array<Post> = new Array<Post>();
	let urlProps: SearchParams;
	let hasMorePages: boolean = false;

	//load the first posts directly
	onMount(async () => {
		loadMorePosts();
		const urlParams = new URLSearchParams(window.location.search);
		urlProps = {
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

	const getUsers = async (searchQuery: string, offset: number, limit: string) => {
		const response = await fetch(
			`/api/users?username=${searchQuery}&offset=${offset}&limit=${limit}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		const body = await response.json();

		if (body.error) {
			if (body.data.error) {
				const t: ToastSettings = {
					message: body.data.error.message,
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
			}
			isError = true;
		} else {
			isError = false;
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

	async function searchUsers() {
		goto(`/search?username=${searchTerm}`);
		const response = await getUsers(searchTerm, urlProps.offset, globalConfig.limit);
		return response.data;
	}

	async function handleUsers(response: UserSearch) {
		userSearch = response.records;
		postSearch = [];
		if (urlProps.offset !== null) {
			urlProps.offset + parseInt(globalConfig.limit) + 1 < response.pagination.records
				? (hasMorePages = true)
				: (hasMorePages = false);
		}
	}

	async function handleSearch() {
		urlProps.offset = 0;
		if (tabSet === POSTTAB && searchTerm.length > 0) {
			//post search via hashtags needs to be implemented
			userSearch = [];
			postSearch.push(searchTerm);
		} else if (tabSet === USERTAB && searchTerm.length > 0) {
			const response: UserSearch = await searchUsers();
			handleUsers(response);
		} else {
			userSearch = [];
			postSearch = [];
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

<div class="p-4 flex justify-center sticky top-0 z-40">
	<div
		class="input-group input-group-divider grid-cols-[auto_1fr_auto] w-full sm:w-3/4 md:w-full lg:w-3/4"
	>
		<Icon src={MagnifyingGlass} class="w-8" />
		<input type="search" placeholder="Suchen..." bind:value={searchTerm} on:change={handleSearch} />
		<button
			class="variant-filled-secondary hover:variant-soft-primary"
			on:click={handleSearch}
			disabled={searchTerm.length === 0}
			>Suchen
		</button>
	</div>
</div>

{#if postSearch.length > 0 || userSearch.length > 0}
	<TabGroup
		justify="flex justify-center"
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
		flex="flex-1 lg:flex-none"
		class="m-4"
	>
		<Tab on:change={handleSearch} bind:group={tabSet} name="tab1" value={POSTTAB}>
			<div class="flex justify-center grid grid-col">
				<Icon class="w-8" src={DevicePhoneMobile} />
				<span>Posts</span>
			</div>
		</Tab>
		<Tab on:change={handleSearch} bind:group={tabSet} name="tab2" value={USERTAB}>
			<div class="flex justify-center grid grid-col">
				<Icon class="flex justify-center w-8" src={User} />
				<span>Nutzer</span>
			</div>
		</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === POSTTAB}
				<PostTab />
			{:else if tabSet === USERTAB}
				<UserTab loadMore={loadMoreUsers} users={userSearch} {isError} {hasMorePages} />
			{/if}
		</svelte:fragment>
	</TabGroup>
{:else}
	<Posts {posts} {loadMorePosts} {lastPage} />
{/if}
