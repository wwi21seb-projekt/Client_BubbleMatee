<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { PasswordInput, UsernameInput } from '$components';
	import { currentUsername, isLoggedIn } from '$stores';
	import { activatePushNotifications, getErrorMessage } from '$utils';
	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	const toastStore: ToastStore = getToastStore();

	let username: string = $page.url.searchParams.get('username')?.toString() ?? '';
	let password: string;

	let loading: boolean = false;

	const isRedirect: string | null = $page.url.searchParams.get('redirect');
	//isRedirekt = '1' -> redirect to login page and show toast
	//isRedirekt = '2' -> redirect to login page from client side, toast already shown

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

	const login: () => Promise<void> = async () => {
		loading = true;
		try {
			const response: Response = await fetch('/api/users/login', {
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
						message: getErrorMessage(body.data.error.code, false),
						background: 'variant-filled-warning'
					};
					toastStore.trigger(t);
					goto(`/login/verify?username=${username}`);
				} else {
					const t: ToastSettings = {
						message: getErrorMessage(body.data.error.code, false),
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
				}
			} else {
				isLoggedIn.set(true);
				currentUsername.set(username);
				goto('/myProfile');
				await activatePushNotifications();
				invalidateAll();
			}

			return body;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	};

	const handleSubmit: () => Promise<void> = async () => {
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
	<div class="flex justify-center">
		<p>
			Passwort vergessen? <a
				class="dark:text-primary-500 text-secondary-500"
				href="/login/passwordForget">Passwort zurücksetzen</a
			>
		</p>
	</div>
</main>
