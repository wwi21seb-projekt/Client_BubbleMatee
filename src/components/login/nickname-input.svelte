<script lang="ts">
	export let nickname: string;
</script>

<label>
	<span>Nickname (optional):</span>
	<input
		class="input"
		title="Bitte gib einen Aliasnamen ein."
		type="text"
		placeholder="max_müller"
		autocomplete="nickname"
		bind:value={nickname}
		maxLength="25"
	/>
</label>
