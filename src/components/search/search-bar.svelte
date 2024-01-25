<script lang="ts">
	import { MagnifyingGlass } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let searchTerm: string;
	export let handleSearch: () => Promise<void>;
</script>

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
