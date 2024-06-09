<script lang="ts">
	import { goto } from '$app/navigation';
	import { UsernameInput } from '$components';
	import { getErrorMessage } from '$utils';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let username: string;

	let loading: boolean = false;

	const sendMailForCode = async () => {
		loading = true;
		try {
			const response = await fetch(`/api/users/${username}/reset-password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const body = await response.json();
			if (body.error) {
				const t: ToastSettings = {
					message: getErrorMessage(body.data.error.code, false),
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
			} else {
				const t: ToastSettings = {
					message: 'E-Mail versendet',
					background: 'variant-filled-success'
				};
				toastStore.trigger(t);
				goto('/login/passwordForget/passwordChange');
			}

			return body;
		} catch (e) {
			console.error(e);
			const t: ToastSettings = {
				message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		} finally {
			loading = false;
		}
	};

	const handleSubmit = async () => {
		await sendMailForCode();
	};
</script>

<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
	<div class="flex justify-center">
		<h1 class="h1">Passwort Zurücksetzen</h1>
	</div>
	<form
		on:submit|preventDefault={handleSubmit}
		class="m-4 grid justify-items-strech max-w-xs gap-4"
	>
		<UsernameInput bind:username isSignUp={false} />
		<button type="submit" class="btn variant-filled-primary mt-2" disabled={loading}
			>{loading ? `Lädt...` : `Code Anfordern`}</button
		>
	</form>
</main>
