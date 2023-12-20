<script lang="ts">
	import { goto } from '$app/navigation';
	import { isLoggedIn } from '$stores';
	import type { UserInfo } from '$domains';
	import { ProfileHeader } from '$components';

	export let data;
	let user: UserInfo = {
		username: 'test_user',
		nickname: 'test_user_nickname',
		status:
			'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquy', //UTF-8, 128 Zeichen
		profilePictureUrl: '',
		follower: 123,
		following: 3467,
		posts: 23,
		subscriptionId: ''
	};
	let name: string = user.nickname === '' ? user.username : user.nickname;
</script>

<!-- Profile of the App -->
<button
	class="btn variant-filled-primary"
	on:click={() => {
		isLoggedIn.set(false);
		goto('/login');
	}}>Ausloggen Testzwecke</button
>
<ProfileHeader {user} />
