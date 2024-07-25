<!--Menu component for a post. Containing a button to delete the post-->
<script lang="ts">
	import { Trash, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { type ModalSettings, type ModalStore, getModalStore } from '@skeletonlabs/skeleton';
	export let deletePost: () => void;
	const modalStore: ModalStore = getModalStore();

	// function to handle a delete request. the user has to condirm, that he is sure. Then the passed function is called.
	function handleDelete(): void {
		const modal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Beitrag löschen?',
			body: 'Bist du sicher, dass du den Beitrag löschen möchtest?',
			buttonTextConfirm: 'Löschen',
			buttonTextCancel: 'Abbrechen',
			// If confirmed -> delete Post
			response: (r: boolean) => {
				if (r) {
					deletePost();
				}
			}
		};
		modalStore.trigger(modal);
	}
</script>

<div class="w-full">
	<div class="dark:bg-surface-900 bg-surface-200 p-2 rounded-xl">
		<!--title -->
		<h3 class="m-2 font-bold text-2xl md:text-3xl w-full text-center">Optionen</h3>
		<hr class="!border-t-8 !border-double" />
		<!--delete Button -->
		<button
			class="w-full flex flex-row my-2 text-error-500 hover:text-error-700 text-xl md:text-2xl font-semibold"
			on:click={handleDelete}
		>
			<Icon src={Trash} class="h-6 md:h-8 w-6 md:w-8" />
			<span class="mr-8 w-full flex justify-center items-center">Löschen</span>
		</button>
		<hr class="w-full border-t-2 m-1" />
		<!--cancel Button -->
		<button class="w-full flex flex-row my-2 md:text-2xl hover:text-gray-500">
			<Icon src={XMark} class="h-6 md:h-8 w-6 md:w-8" />
			<span class="mr-8 w-full flex justify-center items-center">Abbrechen</span>
		</button>
	</div>
</div>
