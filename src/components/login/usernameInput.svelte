<script lang="ts">
	export let username: string;
	//TODO: Latin 1 letters allowed
</script>

<label class="p-1">
	<span>Username:</span>
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
</label>
