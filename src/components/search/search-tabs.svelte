<script lang="ts">
	import { ChipComponent, PostTab, UserTab } from '$components';
	import type { Error, Follower, PostData } from '$domains';
	import { globalConfig } from '$utils';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { DevicePhoneMobile, User } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let handleSearch: () => Promise<void>;
	export let loadMoreUsers: () => Promise<void>;
	export let loadMorePostsSearch: () => Promise<void>;
	export let postSearch: PostData;
	export let userSearch: Array<Follower>;
	export let tabSet: number;
	export let isError: boolean;
	export let error: Error;
	export let lastPage: boolean;
	export let chipString: string;
</script>

<div
	class="flex justify-center sticky p-4 z-40 bg-surface-50 dark:bg-surface-900"
	style="top: 4.6rem"
>
	<ChipComponent message={`Sucherergebnisse für ${chipString}`} />
</div>
<div class="flex justify-center">
	<div class="w-full sm:w-3/4 md:w-full lg:w-3/4 z-10">
		<TabGroup
			justify="justify-center"
			active="variant-filled-primary"
			hover="hover:variant-soft-primary"
			flex="flex-1 lg:flex-none "
			class="m-4"
		>
			<Tab on:change={handleSearch} bind:group={tabSet} name="tab1" value={globalConfig.postTab}>
				<div class="flex justify-center grid grid-col">
					<Icon class="w-8" src={DevicePhoneMobile} />
					<span>Posts</span>
				</div>
			</Tab>
			<Tab on:change={handleSearch} bind:group={tabSet} name="tab2" value={globalConfig.userTab}>
				<div class="flex justify-center grid grid-col">
					<Icon class="flex justify-center w-8" src={User} />
					<span>Nutzer</span>
				</div>
			</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === globalConfig.postTab}
					<PostTab loadMore={loadMorePostsSearch} postData={postSearch} {isError} {error} />
				{:else if tabSet === globalConfig.userTab}
					<UserTab
						loadMore={loadMoreUsers}
						users={userSearch}
						{isError}
						{error}
						{lastPage}
						nothingFoundMessage={'Keine Nutzer mit diesem Namen gefunden'}
						nothingFoundSubMessage={'Suche nach einem anderen Namen!'}
					/>
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</div>
