<!--Post-Page -->
<script lang="ts">
	import { FileInput } from '$components';
	import { CheckIcon } from '$images';
	import type { UserInfo, ErrorObject } from '$domains';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { uploadedImageUrl } from '$stores';
	import { goto } from '$app/navigation';
	import { getErrorMessage } from '$utils';

	export let data;
	let toastStore = getToastStore();

	let user = data.error ? null : (data.data as UserInfo);
	let error = data.error ? (data.data as ErrorObject).error : null;
	let errorMessage: string;

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

			console.log(
				JSON.stringify({
					nickname: user?.nickname,
					status: user?.status,
					picture: $uploadedImageUrl
				})
			);

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
		} finally {
		}
	};
</script>

<div class="flex flex-col items-center justify-center">
	<h1 class="h1">
		<span
			class="bg-gradient-to-br from-primary-900 to-primary-600 dark:from-primary-500 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone"
			>Profilbild bearbeiten</span
		>
	</h1>
	<FileInput />

	<button
		class="btn btn-variant-filled-surface iconButton mt-4 px-4 py-2 rounded shadow bg-blue-500 text-white hover:bg-blue-600"
		on:click={profilePictureTransmit}
		><span class="badge self-center"><CheckIcon /></span>
		Bild übernehmen</button
	>
</div>

<style>
	/* Definition of CSS variables for recurring values */
	:root {
		--default-margin: 2rem; /* Default outer margin */
		--default-font-size-large: 3rem; /* Default size for large text */
	}

	/* Styles for h1 elements */
	.h1 {
		font-size: var(--default-font-size-large);
		text-align: center;
		margin-top: var(--default-margin);
		margin-bottom: var(--default-margin);
		transition: transform 0.3s ease-in-out; /* Transition effect for mouse hover */
	}

	.h1:hover {
		transform: scale(1.1); /* Enlarge on hover */
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
