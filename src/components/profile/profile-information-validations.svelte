<script lang="ts">
	import { ErrorMessage } from '$components';

	export let statusInputAmountOfLettersLeft: number;
</script>

<ol class="list gap-4">
	<ErrorMessage
		message={`Noch ${statusInputAmountOfLettersLeft} Buchstaben frei`}
		isError={statusInputAmountOfLettersLeft < 0}
	/>
</ol>
