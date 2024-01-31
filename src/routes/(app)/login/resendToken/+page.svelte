<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { UsernameInput } from '$components';
	import type { Error } from '$domains';
	import { getErrorMessage } from '$utils';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let username: string = $page.url.searchParams.get('username')?.toString() ?? '';

	let loading: boolean = false;

	const handleSubmit = async () => {
		loading = true;
		try {
			const response = await fetch(`/api/users/${username}/activate`, {
				method: 'DELETE'
			});

			const body = await response.json();

			if (body.error) {
				const error: Error = body.data.error;
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
				const t: ToastSettings = {
					message: 'Code wurde erneut gesendet',
					background: 'variant-filled-success'
				};
				toastStore.trigger(t);
				goto(`/login/verify${getUsernameSearchParams()}`);
			}

			return body;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	};
	function getUsernameSearchParams(): string {
		return username ? `?username=${username}` : '';
	}
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

		<button type="submit" class="btn variant-filled-primary" disabled={loading}
			>{loading ? 'Lädt ...' : 'Bestätigen'}</button
		>
	</form>
	<div class="flex justify-center">
		<p>
			Code erhalten? <a class="dark:text-primary-500 text-secondary-500" href="/login/verify"
				>Code eingeben</a
			>
		</p>
	</div>
</main>
