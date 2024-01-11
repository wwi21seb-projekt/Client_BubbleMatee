<script lang="ts">
	import { goto } from '$app/navigation';
	import { ErrorAlert, NicknameInput, ProfileInformationValidations } from '$components';
	import StatusInput from '$components/profile/status-input.svelte';
	import type { UserInfo, Error } from '$domains';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	let toastStore = getToastStore();

	export let data;

	let user: UserInfo | null = data.error ? null : (data.data as UserInfo);
	let error: Error | null = data.error ? (data.data as Error) : null;

	let nicknameInput: string = user?.nickname as string;
	let statusInput: string = user?.status as string;
	let loading: boolean = false;

	$: informationChanged = nicknameInput !== user?.nickname || statusInput !== user?.status;

	const amountOfLettersAllowedInStatus: number = 128;

	const handleSave = async () => {
		loading = true;
		try {
			const response = await fetch('/api/users', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ nickname: user?.nickname, status: user?.status })
			});

			const body = await response.json();

			if (body.error) {
				if (body.data.error) {
					const t: ToastSettings = {
						message: body.data.error.message,
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
				}
			} else {
				const t: ToastSettings = {
					message: 'Profilinformationen erfolgreich geändert!',
					background: 'variant-filled-success'
				};
				toastStore.trigger(t);
				goto('/myProfile');
			}

			return body;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	};
</script>

<main class="p-4 h-full w-full grid grid-cols-1 place-content-center justify-items-center">
	{#if user}
		<div class="flex justify-center pb-4">
			<h1 class="h1">Profilinformationen bearbeiten</h1>
		</div>
		<div class="grid justify-items-strech max-w-xs gap-4">
			<NicknameInput bind:nickname={nicknameInput} />
			<StatusInput bind:status={statusInput} {amountOfLettersAllowedInStatus} />
			<ProfileInformationValidations
				statusInputAmountOfLettersLeft={amountOfLettersAllowedInStatus - statusInput.length}
			/>
			<button
				class="btn variant-filled-primary"
				disabled={loading || !informationChanged}
				on:click={handleSave}>{loading ? 'Lädt...' : 'Speichern'}</button
			>
		</div>
	{:else if error}
		<ErrorAlert message={error.message} />
	{/if}
</main>
