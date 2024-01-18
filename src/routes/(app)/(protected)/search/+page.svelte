<script lang="ts">
	import { DevicePhoneMobile, MagnifyingGlass, User } from '@steeze-ui/heroicons';
	import { page } from '$app/stores';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Tab, TabGroup, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { Author, SearchParams } from '$domains';
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

	//load the first posts directly
	onMount(() => {
		loadMorePosts();
		const urlParams = new URLSearchParams(window.location.search);
		urlProps = {
			username: urlParams.get('username') !== null ? urlParams.get('username') : '',
			offset: urlParams.get('offset') !== null ? urlParams.get('offset') : '0'
		};

		if (urlProps.username) {
			searchTerm = urlProps.username;
			tabSet = USERTAB;
			searchUsers();
		} else {
			tabSet = POSTTAB;
		}
	});
	const POSTTAB = 0;
	const USERTAB = 1;

	const getUsers = async (searchQuery: string, offset: number, limit: number) => {
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

	async function searchUsers() {
		goto(`/search?username=${searchTerm}&offset=${urlProps.offset}&limit=${globalConfig.limit}`);
		const response = await getUsers(searchTerm, 0, 10);
		//const body = await response.json();
		userSearch = response.data.records;
		postSearch = [];
	}

	async function handleSearch() {
		if (tabSet === POSTTAB && searchTerm.length > 0) {
			//post search via hashtags needs to be implemented
			userSearch = [];
			postSearch.push(searchTerm);
		} else if (tabSet === USERTAB && searchTerm.length > 0) {
			searchUsers();
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

<div class="m-4 flex justify-center">
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
				<UserTab users={userSearch} {isError} />
			{/if}
		</svelte:fragment>
	</TabGroup>
{:else}
	<Posts {posts} {loadMorePosts} {lastPage} />
{/if}
