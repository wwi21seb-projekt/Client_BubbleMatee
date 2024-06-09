<script lang="ts">
	import { goto } from '$app/navigation';
	import { UsernameInput, PasswordInput, PasswordValidations } from '$components';
	import { getErrorMessage } from '$utils';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import {
		containsBigLetter,
		containsNumber,
		containsSmallLetter,
		containsSpecialCharacter,
		passwordLongEnough,
		passwordValid,
		passwordsMatch
	} from '$utils';

	export let password: string = '';
	export let passwordRepeat: string = '';
	export let code: string = '';

	let username: string = '';

	$: stepLocked =
		!username ||
		!passwordValid(password) ||
		!passwordsMatch(password, passwordRepeat) ||
		code.length !== 6;

	const toastStore = getToastStore();

	let loading: boolean = false;

	const sendReset = async () => {
		loading = true;
		try {
			const response = await fetch(`/api/users/${username}/reset-password`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					token: code,
					newPassword: password
				})
			});

			const body = await response.json();

			if (body.error) {
				const t: ToastSettings = {
					message: getErrorMessage(body.data.error.code, false),
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
			} else {
				const t: ToastSettings = {
					message: 'Passwort erfolgreich geändert',
					background: 'variant-filled-success'
				};
				toastStore.trigger(t);
				goto('/login');
			}

			return body;
		} catch (e) {
			console.error(e);
			const t: ToastSettings = {
				message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		} finally {
			loading = false;
		}
	};

	const handleSubmit = async () => {
		await sendReset();
	};
</script>

<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
	<div class="flex justify-center">
		<h1 class="h1">Passwort Verändern</h1>
	</div>

	<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />

	<section>
		<form class="m-4 grid justify-items-stretch max-w-xs gap-1 h-82 w-56 md:w-72">
			<UsernameInput bind:username isSignUp={false} />
		</form>
		<form class="mx-4 grid justify-items-stretch max-w-xs h-82 w-56 md:w-72">
			<span>Code:</span>
			<input
				type="text"
				class="input"
				bind:value={code}
				placeholder="6-stelliger Code"
				maxlength="6"
				pattern="\d{6}"
				required
			/>
		</form>
		<form class="m-4 grid justify-items-stretch max-w-xs gap-4 h-82 w-56 md:w-72">
			<PasswordInput
				bind:password
				isRepeatPassword={false}
				isSignUp={true}
				passwordsMatch={passwordsMatch(password, passwordRepeat)}
				passwordValid={passwordValid(password)}
			/>
			{#if passwordValid(password)}
				<PasswordInput
					bind:password={passwordRepeat}
					isRepeatPassword={true}
					isSignUp={true}
					passwordsMatch={passwordsMatch(password, passwordRepeat)}
					passwordValid={passwordValid(password)}
				/>
			{/if}
			<PasswordValidations
				passwordValid={passwordValid(password)}
				passwordLongEnough={passwordLongEnough(password)}
				passwordsMatch={passwordsMatch(password, passwordRepeat)}
				containsSpecialCharacter={containsSpecialCharacter(password)}
				containsSmallLetter={containsSmallLetter(password)}
				containsBigLetter={containsBigLetter(password)}
				containsNumber={containsNumber(password)}
			/>
		</form>
	</section>

	<form
		on:submit|preventDefault={handleSubmit}
		class="m-4 grid justify-items-stretch max-w-xs gap-4"
	>
		<button type="submit" class="btn variant-filled-primary mt-2" disabled={stepLocked || loading}
			>{loading ? `Lädt...` : `Passwort zurücksetzen`}</button
		>
	</form>
</main>
