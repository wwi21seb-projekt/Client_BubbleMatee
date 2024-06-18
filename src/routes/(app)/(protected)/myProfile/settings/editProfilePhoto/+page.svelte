<!--Post-Page -->
<script lang="ts">
	import { FileInput } from '$components';
	import { CheckIcon } from '$images';
	import type { UserInfo } from '$domains';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { uploadedImageUrl } from '$stores';
	import { goto } from '$app/navigation';
	import { getErrorMessage } from '$utils';

	export let data;
	let toastStore = getToastStore();

	let user = data.error ? null : (data.data as UserInfo);
	const profilePictureTransmit = async () => {
		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					nickname: user?.nickname,
					status: user?.status,
					picture: $uploadedImageUrl
				})
			});

			const dataResponse = await response.json();

			if (dataResponse.error) {
				if (dataResponse.data.error) {
					const t: ToastSettings = {
						message: getErrorMessage(dataResponse.data.error.code, false),
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
				}
			} else {
				const t: ToastSettings = {
					message: 'Profilinformationen erfolgreich geändert!',
					background: 'variant-filled-success'
				};
				toastStore.trigger(t);
				goto('/myProfile');
			}

			return dataResponse;
		} catch (e) {
			console.error(e);
		}
	};
</script>

<main class="p-4 h-full w-full grid grid-cols-1 place-content-center justify-items-center">
	<div class="flex justify-center pb-4">
		<h1 class="h1">Profilbild bearbeiten</h1>
	</div>
	<FileInput />

	<button
		class="btn btn-variant-filled-surface iconButton mt-4 px-4 py-2 rounded shadow bg-blue-500 text-white hover:bg-blue-600"
		on:click={profilePictureTransmit}
		><span class="badge self-center"><CheckIcon /></span>
		Bild übernehmen</button
	>
</main>

<style>
	/* Definition of CSS variables for recurring values */
	:root {
		--default-margin: 2rem; /* Default outer margin */
		--default-font-size-large: 3rem; /* Default size for large text */
	}

	/* Media Query for small screens (e.g., mobile phones) */
	@media (max-width: 40rem) {
		:root {
			--default-font-size-large: 2rem; /* Smaller text size for mobile devices */
		}

		.h1 {
			font-size: 2rem; /* Smaller text size for headings */
		}
	}
</style>
