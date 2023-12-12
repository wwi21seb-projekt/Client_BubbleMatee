<script lang="ts">
	export let nickname: string;
</script>

<label class="p-1">
	<span>Nickname (optional):</span>
	<input
		class="input valid:input-success invalid:input-error"
		title="Bitte gib einen Aliasnamen ein."
		type="text"
		placeholder="max_müller"
		autocomplete="nickname"
		bind:value={nickname}
		maxLength="25"
	/>
</label>
