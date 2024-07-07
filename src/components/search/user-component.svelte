<script lang="ts">
	import type { Author } from '$domains';
	import Person from '$lib/assets/person.png';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let author: Author;
</script>

<div class="flex items-center">
	<!--If the User has no profile picture show an anonymos picture-->
	<Avatar src={author.picture && author.picture.url ? author.picture.url : Person} height="auto" />
	<!--Name and Nickname - textsize is enlarged on desktop-->
	<div class="flex flex-col text-left">
		<h3 class="font-bold ml-2 text-xl md:text-2xl max-w-full break-all">{author.username}</h3>
		<small class="ml-2 h-fit text-sm md:text-base max-w-full break-all">{author.nickname}</small>
	</div>
</div>
