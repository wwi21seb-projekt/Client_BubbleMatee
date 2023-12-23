<script lang="ts">
	import { PasswordInput, PasswordValidations } from '$components';
	import {
		containsBigLetter,
		containsNumber,
		containsSmallLetter,
		containsSpecialCharacter,
		passwordLongEnough,
		passwordValid,
		passwordsMatch
	} from '$utils';
	import { Step } from '@skeletonlabs/skeleton';

	export let password: string;
	export let passwordRepeat: string;
	export let loading: boolean;

	$: stepLocked = !passwordValid(password) || !passwordsMatch(password, passwordRepeat);
</script>

<Step locked={stepLocked || loading}>
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			Passwort Eingabe
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>
	<section>
		<form class="m-4 grid justify-items-strech max-w-xs gap-4 h-60 w-56 md:w-72">
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
</Step>
