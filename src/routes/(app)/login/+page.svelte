<script lang="ts">
	import { goto } from '$app/navigation';
	import { PasswordInput, UsernameInput } from '$components';
	import { isLoggedIn, loading } from '$stores';
	import { getErrorMessage } from '$utils';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let username: string;
	let password: string;

	const login = async () => {
		loading.set(true);
		try {
			const response = await fetch('/api/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username: username, password: password })
			});

			const body = await response.json();

			if (body.error) {
				if (body.data.error.code === 'ERR-005') {
					const t: ToastSettings = {
						message: getErrorMessage(body.data.error.code),
						background: 'variant-filled-warning'
					};
					toastStore.trigger(t);
					goto('/login/verify');
				} else {
					const t: ToastSettings = {
						message: getErrorMessage(body.data.error.code),
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
				}
			} else {
				isLoggedIn.set(true);
				goto('/myProfile');
			}

			return body;
		} catch (e) {
			console.error(e);
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
		<UsernameInput bind:username isSignUp={false} />
		<PasswordInput bind:password isRepeatPassword={false} isSignUp={false} />
		<button type="submit" class="btn variant-filled-primary mt-2"
			>{$loading ? `Lädt...` : `Anmelden`}</button
		>
	</form>
	<div class="flex justify-center">
		<p>
			Noch kein Account? <a class="dark:text-primary-500 text-secondary-500" href="/login/register"
				>Registrieren</a
			>
		</p>
	</div>
</main>
