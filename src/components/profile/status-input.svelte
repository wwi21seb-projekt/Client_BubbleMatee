<script lang="ts">
	export let status: string;
	export let amountOfLettersAllowedInStatus: number;
</script>

<label>
	<span>Status (optional):</span>
	<textarea
		class="textarea"
		title="Bitte gib einen Status ein."
		placeholder="Hallo, ich bin neu hier!"
		bind:value={status}
		rows="5"
		maxLength={amountOfLettersAllowedInStatus}
	/>
</label>
