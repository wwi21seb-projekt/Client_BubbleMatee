<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { CodeInput, UsernameInput } from '$components';
	import type { Error } from '$domains';
	import { currentUsername, isLoggedIn } from '$stores';
	import { getErrorMessage } from '$utils';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let username: string = $page.url.searchParams.get('username')?.toString() ?? '';
	let code: string;

	let loading: boolean = false;

	const handleSubmit = async () => {
		loading = true;
		try {
			const response = await fetch(`/api/users/${username}/activate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					token: code
				})
			});

			const body = await response.json();

			if (body.error) {
				let error: Error = body.data.error; //TODOS: error handling messages
				let errorColor: string = 'variant-filled-error';

				if (error.code === 'ERR-013') {
					goto('/login');
					errorColor = 'variant-filled-warning';
				}

				const t: ToastSettings = {
					message: getErrorMessage(error.code, false),
					background: errorColor
				};
				toastStore.trigger(t);
			} else {
				isLoggedIn.set(true);
				currentUsername.set(username);
				goto('/myProfile');
			}

			return body;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	};

	function getUsernameSearchParams(): string {
		return username ? '?username=' + username : '';
	}
</script>

<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
	<div class="flex justify-center">
		<h1 class="h1">Account bestätigen</h1>
	</div>
	<form
		on:submit|preventDefault={handleSubmit}
		class="m-4 grid justify-items-strech max-w-xs gap-4"
	>
		<UsernameInput bind:username />
		<CodeInput bind:code />

		<button type="submit" class="btn variant-filled-primary" disabled={loading}
			>{loading ? 'Lädt...' : 'Bestätigen'}</button
		>
	</form>
	<div class="flex justify-center">
		<p>
			Keinen Code erhalten? <a
				class="dark:text-primary-500 text-secondary-500"
				href="/login/resendToken{getUsernameSearchParams()}">Erneut senden</a
			>
		</p>
	</div>
</main>
