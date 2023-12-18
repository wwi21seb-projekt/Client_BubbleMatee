<!--Header component for a post. Containing the userinformation and a date.-->
<script>
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<div class="flex items-center justify-between">
	<div class="flex items-center">
		<Avatar src="src/images/about/aidan.png" height="auto" />
		<div class="flex flex-col text-left">
			<h3 class="font-bold ml-2 text-xl">Username</h3>
			<small class="ml-2 h-fit">Nickname</small>
		</div>
	</div>
	<div class="flex flex-col text-right">
		<small>16.12.2023</small>
		<small>17:45 Uhr</small>
	</div>
</div>
