<script lang="ts">
	import { ProfileView } from '$components';

	let user = {
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
	let name = user.nickname === '' ? user.username : user.nickname;
</script>

<ProfileView {user} {name} />
