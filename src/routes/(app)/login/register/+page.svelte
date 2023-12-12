<script lang="ts">
	import { goto } from '$app/navigation';
	import { UserInfoStep, PasswordStep } from '$components';
	import type { Response } from '$domains';
	import { currentUser, isLoggedIn, loading } from '$stores';
	import { Stepper } from '@skeletonlabs/skeleton';

	let email: string;
	let password: string;
	let passwordRepeat: string;
	let username: string;
	let nickname: string;

	let error: Error | null = null;

	const handleSubmit = async () => {
		loading.set(true);
		error = null;
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

			const body = (await response.json()) as Response;

			if (body.error) {
				error = body.data.error;
			} else {
				currentUser.set({ email: body.data.email, username: body.data.username });
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
		<p>Bereits registriert? <a class="text-primary-400" href="/login">Anmelden</a></p>
	</div>
</main>
