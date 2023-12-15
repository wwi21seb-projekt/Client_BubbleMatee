<script lang="ts">
	import { goto } from '$app/navigation';
	import { isLoggedIn } from '$stores';
</script>

<!-- Profile of the App -->
<button
	class="btn variant-filled-primary"
	on:click={() => {
		isLoggedIn.set(false);
		goto('/login');
	}}>Ausloggen Testzwecke</button
>
<div class="container h-full mx-auto flex justify-center items-center">Profile</div>
