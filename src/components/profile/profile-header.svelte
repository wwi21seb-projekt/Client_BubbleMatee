<script lang="ts">
	import type { UserInfo } from '$domains';

	export let user: UserInfo;
</script>

<div class="p-4">
	<p>{user.follower}</p>
	<p>{user.following}</p>
	<p>{user.posts}</p>
</div>
