<script lang="ts">
	import { goto } from '$app/navigation';
	import { UsernameInput } from '$components';
	import type { Error } from '$domains';
	import { currentUser, loading } from '$stores';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let username: string = $currentUser.username;

	const handleSubmit = async () => {
		loading.set(true);
		try {
			const response = await fetch(`/api/users/${username}/activate`, {
				method: 'DELETE'
			});

			const body = await response.json();

			if (body.error) {
				const error: Error = body.data.error;
				const t: ToastSettings = {
					message: error.message
				};
				toastStore.trigger(t);
			} else {
				//TODO: code was snet again
				const t: ToastSettings = {
					message: 'Code wurde erneut gesendet'
				};
				toastStore.trigger(t);
				goto('/login/verify');
			}

			return body;
		} catch (e: any) {
			console.error(e);
			/* errorState.set(true);
			errorCode.set('EM-000'); */
		} finally {
			loading.set(false);
		}
	};
</script>

<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
	<div class="flex justify-center">
		<h1 class="h1">Email erneut senden</h1>
	</div>
	<form
		on:submit|preventDefault={handleSubmit}
		class="m-4 grid justify-items-strech max-w-xs gap-4"
	>
		<UsernameInput bind:username />

		<button type="submit" class="btn variant-filled-primary">Bestätigen</button>
	</form>
	<div class="flex justify-center">
		<p>Code erhalten? <a class="text-primary-400" href="/login/verify">Code eingeben</a></p>
	</div>
</main>
