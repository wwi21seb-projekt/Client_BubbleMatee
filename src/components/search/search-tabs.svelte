<script lang="ts">
	import { PostTab, UserTab } from '$components';
	import type { Author, Follower, Post } from '$domains';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { DevicePhoneMobile, User } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let POSTTAB: number;
	export let USERTAB: number;

	export let handleSearch: () => Promise<void>;
	export let loadMoreUsers: () => Promise<void>;
	export let loadMorePostsSearch: () => Promise<void>;
	export let postSearch: Array<Post>;
	export let userSearch: Array<Follower>;
	export let tabSet: number;
	export let isError: boolean;
	export let lastPage: boolean;
</script>

<div class="p-4 w-full sm:w-3/4 md:w-full lg:w-3/4 z-10">
	<TabGroup
		justify="justify-center"
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
		flex="flex-1 lg:flex-none "
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
				<PostTab loadMore={loadMorePostsSearch} posts={postSearch} {isError} {lastPage} />
			{:else if tabSet === USERTAB}
				<UserTab loadMore={loadMoreUsers} users={userSearch} {isError} {lastPage} />
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
