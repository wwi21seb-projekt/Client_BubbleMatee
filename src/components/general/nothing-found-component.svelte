<script lang="ts">
	import { ExclamationTriangle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let message: string;
	export let submessage: string | null = '';
</script>

<div
	class="w-full rounded-xl flex flex-col items-center justify-center card dark:variant-ghost-primary variant-ghost-secondary p-4"
>
	<div class="flex items-center justify-between w-full">
		<div class="flex items-center">
			<!-- Icon auf der linken Seite -->
			<Icon src={ExclamationTriangle} class="h-6 md:h-8 w-6 md:w-8" />
		</div>
		<div class="w-full rounded-xl flex flex-col items-center justify-center">
			<span class="font-semibold text-xl md:text-2xl text-center">{message}</span>
			{#if submessage}
				<span class="text-lg md:text-xl text-center mt-2">{submessage}</span>
			{/if}
		</div>
		<div class="flex items-center">
			<!-- Icon auf der rechten Seite -->
			<Icon src={ExclamationTriangle} class="h-6 md:h-8 w-6 md:w-8" />
		</div>
	</div>
</div>
