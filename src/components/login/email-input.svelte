<script lang="ts">
	import { getUserInfoColors, isValidEmail, getUserInfoIcons } from '$utils';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let email: string = '';
	export let isSignUp: boolean = false;

	$: emailColor = getUserInfoColors(email, isValidEmail);
	$: emailIcon = getUserInfoIcons(email, isValidEmail);
</script>

<label>
	<span>E-Mail:</span>
	<div class="input-group input-group-divider grid-cols-[1fr_auto]">
		<input
			class="input"
			title="Bitte gib deine E-Mail-Adresse ein."
			type="email"
			placeholder="john@example.com"
			autocomplete="email"
			bind:value={email}
			required
			maxLength="128"
		/>
		{#if isSignUp && emailIcon}
			<div class="[&>*]:pointer-events-none">
				<Icon class="{emailColor} w-6" src={emailIcon} />
			</div>
		{/if}
	</div>
</label>

<div class="card p-4 variant-filled-surface" data-popup="popupHoverEmail">
	<p>Gebe eine korrekte E-Mail Adresse an</p>
</div>
