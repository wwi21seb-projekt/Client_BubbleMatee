<script lang="ts">
	import type { UserInfo } from '$domains';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let user: UserInfo;
	export let name: string;
</script>

<div class="p-4 grid grid-cols-4 gap-1 font-semibold">
	<Avatar initials={name.charAt(0)} background="bg-surface-300" />
	<div class="flex flex-col self-center">
		<div class="place-self-center">{user.posts}</div>
		<div class="place-self-center">Posts</div>
	</div>
	<div class="flex flex-col self-center">
		<div class="place-self-center">{user.follower}</div>
		<div class="place-self-center">Mir folgen</div>
	</div>
	<div class="flex flex-col self-center">
		<div class="place-self-center">{user.following}</div>
		<div class="place-self-center">Ich folge</div>
	</div>
</div>
<div class="px-4">{user.status}</div>
