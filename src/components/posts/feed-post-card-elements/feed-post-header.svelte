<!--Header component for a post. Containing the userinformation and a date.-->
<script lang="ts">
	import type { Author } from '$domains';
	import { calculatePassedTime } from '$utils';
	import { UserComponent } from '$components';
	export let date: Date;
	export let author: Author;
	//calculate the time that has passend since the post in weeks/ days/ hours or minutes
	let dateString: string = calculatePassedTime(date);
</script>

<div class="flex items-center justify-between">
	<!--Element shows the profile picture, username, nichname and the time that has passed since the post-->
	<UserComponent {author} />
	<!--Show time that has passed since the post-->
	<div class="flex flex-col text-right">
		<small class="text-sm md:text-base">{'vor ' + dateString}</small>
	</div>
</div>
