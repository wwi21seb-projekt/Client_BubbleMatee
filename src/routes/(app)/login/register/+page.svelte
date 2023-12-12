<script lang="ts">
	import {
		PasswordInput,
		EmailInput,
		NicknameInput,
		UsernameInput,
		PasswordValidations
	} from '$components';
	import { Stepper, Step } from '@skeletonlabs/skeleton';

	let email: string;
	let password: string;
	let passwordRepeat: string;
	let username: string;
	let nickname: string;
	let isPasswordValid: boolean = false;

	const handleSubmit = () => {
		// Hier kannst du die Logik für die Authentifizierung implementieren
		console.log('E-Mail:', email);
		console.log('Passwort:', password);
		console.log('Passwort repead:', passwordRepeat);
		console.log('Username:', username);
		console.log('Nickname:', nickname);
		// Füge hier die Authentifizierungslogik hinzu, z.B. API-Aufruf oder lokale Überprüfung
	};

	function passwordLongEnough(password: string): boolean {
		if (!password) {
			return false;
		}
		return password.length >= 8;
	}

	function containsSmallLetter(password: string): boolean {
		if (!password) {
			return false;
		}
		return /[a-z]/.test(password);
	}

	function containsSpecialCharacter(password: string): boolean {
		return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
	}

	function containsNumber(password: string): boolean {
		return /[\d]/.test(password);
	}

	function containsBigLetter(password: string): boolean {
		return /[A-Z]/.test(password);
	}

	function passwordsMatch(password: string, passwordRepeat: string): boolean {
		console.log(password, passwordRepeat);
		return password === passwordRepeat;
	}

	function passwordValid(password: string): boolean {
		return (
			passwordLongEnough(password) &&
			containsSmallLetter(password) &&
			containsSpecialCharacter(password) &&
			containsNumber(password) &&
			containsBigLetter(password)
		);
	}
</script>

<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
	<div class="flex justify-center">
		<h1 class="h1">Registrieren</h1>
	</div>
	<Stepper
		steps={['Nutzerdaten', 'Passwort setzen']}
		activeStep={0}
		buttonBackLabel="Zurück"
		buttonNextLabel="Weiter"
		buttonCompleteLabel="Registrieren"
	>
		<Step>
			<form
				on:submit|preventDefault={handleSubmit}
				class="m-4 grid justify-items-strech max-w-xs gap-4"
			>
				<EmailInput bind:email />
				<UsernameInput bind:username />
				<NicknameInput bind:nickname />
			</form>
		</Step>
		<Step locked={isPasswordValid}>
			<form
				on:submit|preventDefault={handleSubmit}
				class="m-4 grid justify-items-strech max-w-xs gap-4"
			>
				<PasswordInput bind:password isRepeatPassword={false} isSignUp={true} />
				{#if passwordValid(password)}
					<PasswordInput bind:password={passwordRepeat} isRepeatPassword={true} isSignUp={true} />
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
		</Step>
	</Stepper>
	<div class="flex justify-center p-4">
		<p>Bereits registriert? <a class="text-primary-400" href="/login">Anmelden</a></p>
	</div>
</main>
