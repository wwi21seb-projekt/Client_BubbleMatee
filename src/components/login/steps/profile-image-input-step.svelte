<script lang="ts">
	import { Step } from '@skeletonlabs/skeleton';
	import { FileInput } from '$components';
</script>

<Step>
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			Profilbild hochladen
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>

	<FileInput />
</Step>
