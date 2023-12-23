<script lang="ts">
	import { ErrorMessage } from '$components';

	export let passwordLongEnough: boolean;
	export let containsSmallLetter: boolean;
	export let containsSpecialCharacter: boolean;
	export let containsNumber: boolean;
	export let containsBigLetter: boolean;
	export let passwordsMatch: boolean;
	export let passwordValid: boolean;
	export let oldPasswordNeeded: boolean = false;
	export let oldPasswordEntered: boolean = true;
</script>

<ol class="list gap-4">
	{#if oldPasswordNeeded}
		<ErrorMessage message="Altes Passwort eingegeben" isError={!oldPasswordEntered} />
	{/if}
	{#if !passwordValid}
		<ErrorMessage message="Passwort mindestens 8 Zeichen lang" isError={!passwordLongEnough} />
		<ErrorMessage message="Kleinbuchstabe verwendet" isError={!containsSmallLetter} />
		<ErrorMessage message="Großbuchstabe verwendet" isError={!containsBigLetter} />
		<ErrorMessage message="Nummer verwendet" isError={!containsNumber} />
		<ErrorMessage message="Sonderzeichen verwendet" isError={!containsSpecialCharacter} />
	{:else}
		<ErrorMessage message="Passwortübereinstimmung" isError={!passwordsMatch} />
	{/if}
</ol>
