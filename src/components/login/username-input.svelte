<script lang="ts">
	import { getUserInfoColors, getUserInfoIcons, isValidUsername } from '$utils';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let username: string = '';
	export let isSignUp: boolean = false;

	$: usernameColor = getUserInfoColors(username, isValidUsername);
	$: usernameIcon = getUserInfoIcons(username, isValidUsername);
</script>

<label>
	<span>Nutzname:</span>
	<div class="input-group input-group-divider grid-cols-[1fr_auto]">
		<input
			class="input"
			title="Bitte gib einen Nutzernamen ein."
			type="text"
			placeholder="max_mueller"
			autocomplete="username"
			bind:value={username}
			required
			maxLength="20"
		/>
		{#if isSignUp && usernameIcon}
			<button class="[&>*]:pointer-events-none">
				<Icon class="{usernameColor} w-6" src={usernameIcon} />
			</button>
		{/if}
	</div>
</label>

<div class="card p-4 variant-filled-surface" data-popup="popupHoverUsername">
	<p>Der Nutzernahme darf keine Sonderzeichen enthalten und nicht länger als 20 Zeichen sein</p>
</div>
