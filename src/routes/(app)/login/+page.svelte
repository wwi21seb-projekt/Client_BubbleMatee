<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { PasswordInput, UsernameInput } from '$components';
	import { currentUsername, isLoggedIn } from '$stores';
	import { getErrorMessage } from '$utils';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	const toastStore = getToastStore();

	let username: string;
	let password: string;

	let loading: boolean = false;

	const isRedirect = $page.url.searchParams.get('redirect');
	if (isRedirect) {
		if (isRedirect === '1') {
			const t: ToastSettings = {
				message: 'Bitte melde dich an, um fortzufahren.',
				background: 'variant-filled-warning'
			};
			toastStore.trigger(t);
		}
		isLoggedIn.set(false);
		currentUsername.set('');
	}

	onMount(() => {
		if (isRedirect) {
			fetch('/api/users/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	});

	const login = async () => {
		loading = true;
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
						message: body.data.error.message,
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
				}
			} else {
				isLoggedIn.set(true);
				currentUsername.set(username); //TODOS: get useranme from token when discussed with other teams
				goto('/myProfile');
			}

			return body;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
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
		<button type="submit" class="btn variant-filled-primary mt-2" disabled={loading}
			>{loading ? `Lädt...` : `Anmelden`}</button
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
