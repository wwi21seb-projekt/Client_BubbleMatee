<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronDown } from '@steeze-ui/heroicons';

	export let loadMore: () => void;
</script>

<button
	class="mb-2 w-full rounded-t-md rounded-b-[20px] flex flex-col items-center bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600
  				dark:hover:from-tertiary-600 dark:hover:to-secondary-600 hover:from-primary-500 hover:to-primary-700 focus:outline-none focus:ring focus:border-primary-300
  				dark:focus:from-tertiary-600 dark:focus:to-secondary-600 focus:from-primary-5000 focus:to-primary-700"
	on:click={loadMore}
>
	<span class="font-bold text-lg"> Mehr Laden </span>
	<Icon src={ChevronDown} class="h-8 font-bold" />
</button>
