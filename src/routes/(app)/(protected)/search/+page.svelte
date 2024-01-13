<script lang="ts">
	import { DevicePhoneMobile, MagnifyingGlass, User } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Tab, TabGroup, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { UserSearchItem } from '$domains';
	import { goto } from '$app/navigation';

	let toastStore = getToastStore();

	let searchTerm: string = '';
	let tabSet: number = 0;
	let isError: boolean = false;
	let users: Array<UserSearchItem> = [];
	let posts = [];

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

	async function handleSearch() {
		if (tabSet === POSTTAB) {
			//post search via hashtags needs to be implemented
			console.log('Post search');
			posts.push({ id: 1, title: 'Test' });
			users = [];
		} else if (tabSet === USERTAB) {
			goto(`/search?username=${searchTerm}&offset=0&limit=10`);
			const response = await getUsers(searchTerm, 0, 10);
			//const body = await response.json();
			console.log(response);
			users = response.data.records;
			posts = [];
		}
	}
</script>

<div class="m-4">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<Icon src={MagnifyingGlass} class="w-8" />
		<input type="search" placeholder="Suchen..." bind:value={searchTerm} on:change={handleSearch} />
		<button
			class="variant-filled-secondary hover:variant-soft-primary"
			on:click={handleSearch}
			disabled={searchTerm.length === 0}
			>Submit
		</button>
	</div>
</div>

{#if posts.length > 0 || users.length > 0}
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
				<p>Post suche kommt noch</p>
			{:else if tabSet === USERTAB}
				{#if !isError}
					{#each users as user}
						<p>{user.username}</p>
					{/each}
				{:else}
					<p>Es ist ein Fehler aufgetreten</p>
				{/if}
				<p>Test</p>
			{/if}
		</svelte:fragment>
	</TabGroup>
{/if}
