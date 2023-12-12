<script lang="ts">
	import { CodeInput, PasswordInput } from '$components';
	import EmailInput from '$components/login/emailInput.svelte';

	let email: string;
	let code: string;

	const handleSubmit = () => {
		// Hier kannst du die Logik für die Authentifizierung implementieren
		console.log('E-Mail:', email);
		console.log('Code:', code);
		// Füge hier die Authentifizierungslogik hinzu, z.B. API-Aufruf oder lokale Überprüfung
	};
</script>

<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
	<div class="flex justify-center">
		<h1 class="h1">Account bestätigen</h1>
	</div>
	<form
		on:submit|preventDefault={handleSubmit}
		class="m-4 grid justify-items-strech max-w-xs gap-4"
	>
		<EmailInput bind:email />
		<CodeInput bind:code />

		<button type="submit" class="btn variant-filled-primary">Bestätigen</button>
	</form>
	<div class="flex justify-center">
		<p>Keinen Code erhalten? <a class="text-primary-400" href="/login/verify">Erneut senden</a></p>
	</div>
</main>
