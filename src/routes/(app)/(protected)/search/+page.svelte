<script lang="ts">
	import { page } from '$app/stores';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { DevicePhoneMobile, MagnifyingGlass, User } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	let searchTerm: string = '';
	let searchResults: string = '';
	let tabSet: number = 0;

	function handleSearch() {
		// Perform search logic here
		searchResults = searchTerm;
		console.log('Searching for:', searchTerm);
	}
</script>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] my-4">
	<Icon src={MagnifyingGlass} class="w-8" />
	<input type="search" placeholder="Suchen..." bind:value={searchTerm} on:change={handleSearch} />
	<button
		class="variant-filled-secondary"
		on:click={handleSearch}
		disabled={searchTerm.length === 0}>Submit</button
	>
</div>

{#if searchResults.length > 0}
	<TabGroup
		justify="justify-center"
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
		flex="flex-1 lg:flex-none"
		rounded=""
		border=""
		class="bg-surface-100-800-token w-full"
	>
		<Tab bind:group={tabSet} name="tab1" value={0}>
			<Icon class="w-8" src={DevicePhoneMobile} /> <span>Posts</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>
			<Icon class="w-8" src={User} /> <span>Nutzer</span>
		</Tab>
	</TabGroup>
{/if}
