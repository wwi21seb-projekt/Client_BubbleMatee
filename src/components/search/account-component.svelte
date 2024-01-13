<script lang="ts">
	import type { UserInfo } from '$domains';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let user: UserInfo;

	let name: string = user.nickname === '' ? user.username : user.nickname;
</script>

<button class="p-4 grid grid-cols-4 gap-0 font-semibold">
	<div class="flex flex-col self-center justify-center">
		<Avatar initials={name.charAt(0)} background="bg-surface-300" width="w-22 lg:w-18 xl:w-16  " />
	</div>
</button>
