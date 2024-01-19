<script lang="ts">
	import type { Author } from '$domains';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let author: Author;
</script>

<div class="flex items-center">
	<!--If the User has no profile picture show an anonymos picture-->
	<Avatar
		src={author.profilePictureUrl ? author.profilePictureUrl : '/src/images/icons/person.png'}
		height="auto"
	/>
	<!--Name and Nickname - textsize is enlarged on desktop-->
	<div class="flex flex-col text-left">
		<h3 class="font-bold ml-2 text-xl md:text-2xl">{author.username}</h3>
		<small class="ml-2 h-fit text-sm md:text-base">{author.nickname}</small>
	</div>
</div>
