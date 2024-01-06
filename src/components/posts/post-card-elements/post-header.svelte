<!--Header component for a post. Containing the userinformation and a date.-->
<script lang="ts">
	import type { Author } from '$domains';
	import { Avatar } from '@skeletonlabs/skeleton';
	export let date: Date;
	export let author: Author;

	//function to calculate the time that has passed since date
	function calculatePassedTime(date: Date) {
		// Current date and time in UTC
		let now: Date = new Date();
		let nowUTC: Date = new Date(now.toUTCString());
		// Difference in milliseconds
		let differenceInMS = nowUTC.getTime() - date.getTime();
		// Calculate difference in minutes, hours, days, and weeks
		let differenceInMinutes = Math.ceil(differenceInMS / (1000 * 60));
		let differenceInHours = Math.ceil(differenceInMS / (1000 * 60 * 60));
		let differenceInDays = Math.ceil(differenceInMS / (1000 * 60 * 60 * 24));
		let differenceInWeeks = Math.ceil(differenceInMS / (1000 * 60 * 60 * 24 * 7));

		// Make decisions on how to represent the time
		if (differenceInMinutes < 60) {
			return differenceInMinutes + ' Minuten';
		} else if (differenceInHours < 24) {
			return differenceInHours + ' Stunden';
		} else if (differenceInDays < 7) {
			return differenceInDays + ' Tagen';
		} else {
			return differenceInWeeks + ' Wochen';
		}
	}
	let dateString: string = calculatePassedTime(date);
</script>

<div class="flex items-center justify-between">
	<div class="flex items-center">
		<!--If the User has no profile picture show an anonymos picture-->
		<Avatar
			src={author.profilePictureUrl === ''
				? 'src/images/icons/person.png'
				: author.profilePictureUrl}
			height="auto"
		/>
		<div class="flex flex-col text-left">
			<h3 class="font-bold ml-2 text-xl">Username</h3>
			<small class="ml-2 h-fit">Nickname</small>
		</div>
	</div>
	<div class="flex flex-col text-right">
		<small>{'vor ' + dateString}</small>
	</div>
</div>
