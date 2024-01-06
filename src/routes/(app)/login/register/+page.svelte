<script lang="ts">
	import { goto } from '$app/navigation';
	import { UserInfoStep, PasswordStep } from '$components';
	import type { Error } from '$domains';
	import { currentUser, loading } from '$stores';
	import { getErrorMessage } from '$utils';
	import { Stepper, type ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let email: string;
	let password: string;
	let passwordRepeat: string;
	let username: string;
	let nickname: string;

	const handleSubmit = async () => {
		loading.set(true);
		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password,
					username: username,
					nickname: nickname
				})
			});

			const body = await response.json();

			if (body.error) {
				let error: Error = body.data.error;
				const t: ToastSettings = {
					message: getErrorMessage(error.code),
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
				//TODO: navigate back to tep 1
			} else {
				currentUser.set({
					email: body.data.email,
					username: body.data.username,
					nickname: body.data.nickname
				});
				goto('/login/verify');
			}

			return body;
		} catch (e) {
			console.error(e);
		} finally {
			loading.set(false);
		}
	};
</script>

<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
	<div class="flex justify-center">
		<h1 class="h1 mb-8">Registrieren</h1>
	</div>
	<Stepper
		buttonBackLabel="Zurück"
		buttonNextLabel="Weiter"
		stepTerm="Schritt"
		buttonCompleteLabel={$loading ? 'Lädt...' : 'Registrieren'}
		on:complete={handleSubmit}
	>
		<UserInfoStep bind:email bind:nickname bind:username />
		<PasswordStep bind:password bind:passwordRepeat />
	</Stepper>
	<div class="flex justify-center p-4">
		<p>
			Bereits registriert? <a class="dark:text-primary-500 text-secondary-500" href="/login"
				>Anmelden</a
			>
		</p>
	</div>
</main>
