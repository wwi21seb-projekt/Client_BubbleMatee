<script lang="ts">
	export let email: string;
</script>

<label class="p-1">
	<span>E-Mail:</span>
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
</label>
