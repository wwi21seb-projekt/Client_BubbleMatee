<script lang="ts">
	import { CodeInput, UsernameInput, ErrorMessage } from '$components';
	import type { Response } from '$domains';
	import { currentUser, loading } from '$stores';

	let username: string = $currentUser.username;

	let error: Error | null = null;

	const handleSubmit = async () => {
		loading.set(true);
		error = null;
		try {
			const response = await fetch(`/api/users/${username}/activate`, {
				method: 'DELETE'
			});

			const body = (await response.json()) as Response;

			if (body.error) {
				error = body.data.error;
			} else {
				//TODO: code was snet again
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

		{#if error}
			<ol>
				<ErrorMessage message={error.message} />
			</ol>
		{/if}
		<button type="submit" class="btn variant-filled-primary">Bestätigen</button>
	</form>
	<div class="flex justify-center">
		<p>Code erhalten? <a class="text-primary-400" href="/login/verify">Code eingeben</a></p>
	</div>
</main>
