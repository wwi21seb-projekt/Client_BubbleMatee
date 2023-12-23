<script lang="ts">
	export let status: string;
</script>

<label>
	<span>Status (optional):</span>
	<textarea
		class="textarea"
		title="Bitte gib einen Status ein."
		placeholder="Hallo, ich bin neu hier!"
		bind:value={status}
		rows="5"
		maxLength="128"
	/>
	<!-- TODO: change to length when decicion of all teams is made -->
</label>
