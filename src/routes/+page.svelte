<!-- Welcome-Page of the App -->
<div class="flex flex-col justify-center items-center h-full">
	<h1 class="h1">
		<span
			class="bg-gradient-to-br from-tertiary-500 to-tertiary-200 bg-clip-text text-transparent box-decoration-clone"
			>Willkommen bei</span
		>
	</h1>
	<div class="items-center">
		<img
			class="img w-10/12 md:w-1/2 md:hover:w-7/12 mx-auto"
			src="src/images/layout/schriftzug.png"
			alt="BubbleMateLogo"
		/>
	</div>
</div>

<style>
	.h1 {
		font-size: var(--default-font-size-large);
		text-align: center;
		margin-top: var(--default-margin);
		margin-bottom: var(--default-margin);
		transition: transform 0.3s ease-in-out; /* Transition effect for mouse hover */
	}

	.h1:hover {
		transform: scale(1.1); /* Enlarge on hover */
	}

	.img {
		transition: transform 0.3s ease-in-out; /* Transition effect for mouse hover */
	}

	.img:hover {
		transform: scale(1.05); /* Enlarge on hover */
	}
</style>
