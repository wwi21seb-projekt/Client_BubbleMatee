<script lang="ts">
	import { getUserInfoColors, getUserInfoIcons, isValidUsername } from '$utils';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { getToastStore, type ToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	const toastStore: ToastStore = getToastStore();
	const t: ToastSettings = {
		message:
			'Der Nutzername darf nur alphanumerische Zeichen enthalten und nicht länger als 20 Zeichen sein.',
		background: 'variant-filled-error'
	};

	export let username: string = '';
	export let isSignUp: boolean = false;

	$: usernameColor = getUserInfoColors(username, isValidUsername);
	$: usernameIcon = getUserInfoIcons(username, isValidUsername);

	// Überprüfe die Gültigkeit des Nutzernamens nach jeder Eingabe
	function validateUsername() {
		if (username && !isValidUsername(username)) {
			toastStore.trigger(t);
		}
	}
</script>

<label>
	<span>Nutzername:</span>
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
			on:input={validateUsername}
		/>
		{#if isSignUp && usernameIcon}
			<div class="[&>*]:pointer-events-none">
				<Icon class="{usernameColor} w-6" src={usernameIcon} />
			</div>
		{/if}
	</div>
</label>
