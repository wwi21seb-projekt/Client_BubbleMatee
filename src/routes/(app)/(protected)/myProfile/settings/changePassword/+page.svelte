<script lang="ts">
	import { goto } from '$app/navigation';
	import { PasswordInput, PasswordValidations } from '$components';
	import {
		containsBigLetter,
		containsNumber,
		containsSmallLetter,
		containsSpecialCharacter,
		getErrorMessage,
		passwordLongEnough,
		passwordValid,
		passwordsMatch
	} from '$utils';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { Error } from '$domains';

	const toastStore = getToastStore();

	let oldPassword: string = '';
	let newPassword: string = '';
	let repeatNewPassword: string = '';

	let loading: boolean = false;

	$: stepLocked =
		!passwordValid(newPassword) ||
		!passwordsMatch(newPassword, repeatNewPassword) ||
		oldPassword === '' ||
		loading;

	const changePassword = async () => {
		loading = true;
		try {
			const response = await fetch('/api/users', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					oldPassword: oldPassword,
					newPassword: newPassword
				})
			});

			const body = await response.json();

			if (body.error) {
				let error: Error = body.data.error;
				const t: ToastSettings = {
					message: getErrorMessage(error.code, false),
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
			} else {
				const t: ToastSettings = {
					message: 'Passwort wurde erfolgreich geändert',
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

<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
	<div class="flex justify-center">
		<h1 class="h1">Passwort ändern</h1>
	</div>
	<form class="m-4 mb-16 grid justify-items-strech max-w-xs gap-4 h-60 w-56 md:w-72">
		<PasswordInput
			bind:password={oldPassword}
			isRepeatPassword={false}
			isSignUp={false}
			label="Altes Passwort"
		/>
		<PasswordInput
			bind:password={newPassword}
			isRepeatPassword={false}
			isSignUp={true}
			passwordsMatch={passwordsMatch(newPassword, repeatNewPassword)}
			passwordValid={passwordValid(newPassword)}
			label="Neues Passwort"
		/>
		{#if passwordValid(newPassword)}
			<PasswordInput
				bind:password={repeatNewPassword}
				isRepeatPassword={true}
				isSignUp={true}
				passwordsMatch={passwordsMatch(newPassword, repeatNewPassword)}
				passwordValid={passwordValid(newPassword)}
				label="Wiederhole neues Passwort"
			/>
		{/if}
		<PasswordValidations
			passwordValid={passwordValid(newPassword)}
			passwordLongEnough={passwordLongEnough(newPassword)}
			passwordsMatch={passwordsMatch(newPassword, repeatNewPassword)}
			containsSpecialCharacter={containsSpecialCharacter(newPassword)}
			containsSmallLetter={containsSmallLetter(newPassword)}
			containsBigLetter={containsBigLetter(newPassword)}
			containsNumber={containsNumber(newPassword)}
			oldPasswordEntered={oldPassword !== ''}
			oldPasswordNeeded={true}
		/>
		<button class="btn variant-filled-primary" disabled={stepLocked} on:click={changePassword}
			>{loading ? 'Lädt...' : 'Passwort ändern'}</button
		>
		<button
			class="btn variant-ghost"
			on:click={() => {
				goto('/myProfile/settings');
			}}>Abbrechen</button
		>
	</form>
</main>
