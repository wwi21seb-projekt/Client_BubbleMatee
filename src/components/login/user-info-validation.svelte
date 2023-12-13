<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { Icon, type IconSource } from '@steeze-ui/svelte-icon';

	export let message: string;
	export let color: string;
	export let icon: IconSource;

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};
</script>

<button class="[&>*]:pointer-events-none" use:popup={popupHover}>
	<Icon class="{color} w-6" src={icon} />
</button>

<div class="card p-4 variant-filled-surface" data-popup="popupHover">
	<p>{message}</p>
</div>
