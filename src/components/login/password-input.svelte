<script lang="ts">
	export let password: string = '';
	export let isRepeatPassword: boolean;
	export let isSignUp: boolean;
	//TODO: Passwort Länge maximal?
	//TODO: Was sind alles ASCII SOnderzeichen?
</script>

<label class="p-1">
	<span>{isRepeatPassword ? 'Wiederhole Passwort' : 'Passwort:'}</span>
	<input
		class="m-2 input {password && isSignUp ? 'valid:input-success invalid:input-error' : ''}"
		title="Bitte gib ein Passwort mit mindestens 1 Groß- und Kleinbuchstaben, 1 Zahl und 1 Sonderzeichen ein."
		type="password"
		bind:value={password}
		required
		minlength="8"
		pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$"
	/>
</label>
