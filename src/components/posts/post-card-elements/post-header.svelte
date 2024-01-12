<!--Header component for a post. Containing the userinformation and a date.-->
<script lang="ts">
	import type { Author } from '$domains';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { calculatePassedTime } from '$utils';
	export let date: Date;
	export let author: Author;
	//calculate the time that has passend since the post in weeks/ days/ hours or minutes
	let dateString: string = calculatePassedTime(date);
</script>

<!--Element shows the profile picture, username, nichname and the time that has passed since the post-->
<div class="flex items-center justify-between">
	<div class="flex items-center">
		<!--If the User has no profile picture show an anonymos picture-->
		<Avatar
			src={author.profilePictureUrl === ''
				? 'src/images/icons/person.png'
				: author.profilePictureUrl}
			height="auto"
		/>
		<!--Name and Nickname - textsize is enlarged on desktop-->
		<div class="flex flex-col text-left">
			<h3 class="font-bold ml-2 text-xl md:text-2xl">Username</h3>
			<small class="ml-2 h-fit text-sm md:text-base">Nickname</small>
		</div>
	</div>
	<!--Show time that has passed since the post-->
	<div class="flex flex-col text-right">
		<small class="text-sm md:text-base">{'vor ' + dateString}</small>
	</div>
</div>
