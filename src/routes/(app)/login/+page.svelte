<script lang="ts">
	import { PasswordInput } from '$components';
	import EmailInput from '$components/login/emailInput.svelte';

	let email: string;
	let password: string;

	const handleSubmit = () => {
		// Hier kannst du die Logik für die Authentifizierung implementieren
		console.log('E-Mail:', email);
		console.log('Passwort:', password);
		// Füge hier die Authentifizierungslogik hinzu, z.B. API-Aufruf oder lokale Überprüfung
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
		<EmailInput bind:email />
		<PasswordInput bind:password isRepeatPassword={false} />

		<button type="submit" class="btn variant-filled-primary">Anmelden</button>
	</form>
	<div class="flex justify-center">
		<p>Noch kein Account? <a class="text-primary-400" href="/login/register">Registrieren</a></p>
	</div>
</main>
