<script lang="ts">
	import { localStorageStore } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';

	export const storeExample: Writable<string> = localStorageStore(
		'storeExample',
		'initialValueHere'
	);
</script>
