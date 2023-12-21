<script lang="ts">
	import { ProfileView } from '$components';

	export let data;
</script>

<!-- Profile of the App 
<button
	class="btn variant-filled-primary"
	on:click={() => {
		isLoggedIn.set(false);
		goto('/login');
	}}>Ausloggen Testzwecke</button
> -->
<ProfileView {data} />
