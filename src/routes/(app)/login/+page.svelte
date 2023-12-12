<script lang="ts">
	import { goto } from '$app/navigation';
	import { PasswordInput, EmailInput, ErrorMessage } from '$components';
	import type { Response } from '$domains';
	import { isLoggedIn, loading } from '$stores';

	let email: string;
	let password: string;

	let error: Error | null = null;

	const login = async () => {
		loading.set(true);
		error = null;
		try {
			const response = await fetch('/api/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: email, password: password })
			});

			const body = (await response.json()) as Response;

			if (body.error) {
				error = body.data.error;
			} else {
				isLoggedIn.set(true);
				goto('/myProfile');
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

	const handleSubmit = async () => {
		await login();
	};
</script>

<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
	<div class="flex justify-center">
		<h1 class="h1">Login</h1>
	</div>
	<form
		on:submit|preventDefault={handleSubmit}
		class="m-4 grid justify-items-strech max-w-xs gap-4"
	>
		<EmailInput bind:email />
		<PasswordInput bind:password isRepeatPassword={false} isSignUp={false} />
		{#if error}
			<ol>
				<ErrorMessage message={error.message} />
			</ol>
		{/if}
		<button type="submit" class="btn variant-filled-primary mt-2"
			>{loading ? `Anmelden` : `Lädt...`}</button
		>
	</form>
	<div class="flex justify-center">
		<p>Noch kein Account? <a class="text-primary-400" href="/login/register">Registrieren</a></p>
	</div>
</main>
