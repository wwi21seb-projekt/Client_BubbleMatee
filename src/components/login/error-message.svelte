<script lang="ts">
	import { XMark, Check } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let message: string;
	export let isError: boolean = true;
</script>

<li class="flex">
	<span class="badge-icon {isError ? 'variant-filled-error' : 'variant-filled-success'} w-4 h-4">
		<Icon src={isError ? XMark : Check} class="w-6 h-6" />
	</span>
	<span class="flex-auto ml-2">{message}</span>
</li>
