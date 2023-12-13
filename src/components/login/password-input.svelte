<script lang="ts">
	import { determineIconType } from '$utils';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { XMark, Check } from '@steeze-ui/heroicons';

	export let password: string = '';
	export let isRepeatPassword: boolean;
	export let isSignUp: boolean;
	export let passwordsMatch: boolean = false;
	export let passwordValid: boolean = false;

	$: isValid = determineIconType(passwordsMatch, isRepeatPassword, passwordValid);
</script>

<label>
	<span>{isRepeatPassword ? 'Wiederhole Passwort' : 'Passwort:'}</span>
	<div class="input-group input-group-divider grid-cols-[1fr_auto]">
		<input
			class="input"
			title={isRepeatPassword
				? 'Bitte gebe das selbe Passwort ein'
				: 'Bitte gib ein Passwort mit mindestens 1 Groß- und Kleinbuchstaben, 1 Zahl und 1 Sonderzeichen ein.'}
			type="password"
			placeholder="********"
			bind:value={password}
			required
			minlength="8"
		/>
		{#if isSignUp}
			<Icon
				class="{isValid ? 'text-success-500' : 'text-error-500'} w-6"
				src={isValid ? Check : XMark}
			/>
		{/if}
	</div>
</label>
