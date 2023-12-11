<script>
	let email = '';
	let password = '';

	const handleSubmit = () => {
		// Hier kannst du die Logik für die Authentifizierung implementieren
		console.log('E-Mail:', email);
		console.log('Passwort:', password);
		// Füge hier die Authentifizierungslogik hinzu, z.B. API-Aufruf oder lokale Überprüfung
	};
</script>

<main class="p-4 h-full grid grid-cols-1 place-content-center">
	<div class="flex justify-center">
		<h1 class="h1">Login</h1>
	</div>
	<form on:submit|preventDefault={handleSubmit} class="m-4 grid justify-items-center gap-4">
		<label class="p-1">
			<span>E-Mail:</span>
			<input
				class="input w-full"
				title="Input (email)"
				type="email"
				placeholder="john@example.com"
				autocomplete="email"
				bind:value={email}
			/>
		</label>

		<label class="p-1">
			<span>Passwort:</span>
			<input
				class="input"
				title="Input (password)"
				type="password"
				placeholder="password"
				bind:value={password}
			/>
		</label>

		<button type="submit" class="btn variant-filled-primary">Anmelden</button>
	</form>
	<div class="flex justify-center">
		<p>Noch kein Account? <a class="text-primary-400" href="/login/register">Registrieren</a></p>
	</div>
</main>
