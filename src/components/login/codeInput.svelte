<script lang="ts">
	export let code: string;
</script>

<label class="p-1">
	<span>Code:</span>
	<input
		class="input valid:input-success invalid:input-error"
		title="Bitte gib den per Email zugesandten Code ein."
		type="text"
		placeholder="123456"
		autocomplete="off"
		bind:value={code}
		required
		maxLength="6"
		minlength="6"
		pattern="[0-9]+"
		inputmode="numeric"
	/>
</label>

<style>
	input:invalid + span::after {
		content: '✖';
		padding-right: 5px;
	}

	input:valid + span::after {
		content: '✓';
		padding-right: 5px;
	}

	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
