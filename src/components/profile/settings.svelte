<script lang="ts">
	import { goto } from '$app/navigation';
	import { SettingIcon } from '$images';

	const handleClick = () => {
		goto('/myProfile/settings');
	};
</script>

<button on:click={handleClick}>
	<SettingIcon />
</button>
