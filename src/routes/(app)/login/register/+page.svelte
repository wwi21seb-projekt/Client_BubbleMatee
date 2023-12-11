<script>
	import { PasswordInput } from '$components';
	import EmailInput from '$components/login/emailInput.svelte';
	import NicknameInput from '$components/login/nicknameInput.svelte';
	import PasswordImput from '$components/login/passwordInput.svelte';
	import UsernameInput from '$components/login/usernameInput.svelte';

	let email = '';
	let password = '';
	let passwordRepeat = '';
	let username = '';
	let nickname = '';

	const handleSubmit = () => {
		// Hier kannst du die Logik für die Authentifizierung implementieren
		console.log('E-Mail:', email);
		console.log('Passwort:', password);
		console.log('Passwort repead:', passwordRepeat);
		console.log('Username:', username);
		console.log('Nickname:', nickname);
		// Füge hier die Authentifizierungslogik hinzu, z.B. API-Aufruf oder lokale Überprüfung
	};
</script>

<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
	<div class="flex justify-center">
		<h1 class="h1">Registrieren</h1>
	</div>
	<form
		on:submit|preventDefault={handleSubmit}
		class="m-4 grid justify-items-strech max-w-xs gap-4"
	>
		<EmailInput bind:email />
		<UsernameInput bind:username />
		<NicknameInput bind:nickname />
		<PasswordInput bind:password isRepeatPassword={false} />
		<PasswordImput bind:password={passwordRepeat} isRepeatPassword={true} />

		<button type="submit" class="btn variant-filled-primary">Registrieren</button>
	</form>
	<div class="flex justify-center">
		<p>Bereits registriert? <a class="text-primary-400" href="/login">Anmelden</a></p>
	</div>
</main>
