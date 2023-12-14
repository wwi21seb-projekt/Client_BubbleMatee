<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { t, locale, locales } from '../../i18n.ts';

	function changeLanguage(e: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		$locale = e.currentTarget.value;
		window.sessionStorage.setItem('store', $locale);
	}
</script>

<!-- App Shell -->
<AppBar>
	<svelte:fragment slot="lead">
		<strong class="text-xl text-center">{$t('layout.title')}</strong>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<select value={$locale} class="select" on:change={changeLanguage}>
			{#each locales as l}
				<option value={l}>{l}</option>
			{/each}
		</select>
	</svelte:fragment>
</AppBar>
