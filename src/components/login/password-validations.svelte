<script lang="ts">
	import { Check, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let passwordLongEnough: boolean;
	export let containsSmallLetter: boolean;
	export let containsSpecialCharacter: boolean;
	export let containsNumber: boolean;
	export let containsBigLetter: boolean;
	export let passwordsMatch: boolean;
	export let passwordValid: boolean;
</script>

<ol class="list gap-4">
	{#if !passwordValid}
		<li>
			{#if passwordLongEnough}
				<span class="badge-icon variant-filled-success w-4 h-4">
					<Icon src={Check} class="w-6 h-6" />
				</span>
			{:else}
				<span class="badge-icon variant-filled-error w-4 h-4">
					<Icon src={XMark} class="w-6 h-6" />
				</span>
			{/if}
			<span class="flex-auto">Passwort mindestens 8 Zeichen lang</span>
		</li>
		<li>
			{#if containsSmallLetter}
				<span class="badge-icon variant-filled-success w-4 h-4">
					<Icon src={Check} class="w-6 h-6" />
				</span>
			{:else}
				<span class="badge-icon variant-filled-error w-4 h-4">
					<Icon src={XMark} class="w-6 h-6" />
				</span>
			{/if}
			<span class="flex-auto">Kleinbuchstabe verwendet</span>
		</li>
		<li>
			{#if containsBigLetter}
				<span class="badge-icon variant-filled-success w-4 h-4">
					<Icon src={Check} class="w-6 h-6" />
				</span>
			{:else}
				<span class="badge-icon variant-filled-error w-4 h-4">
					<Icon src={XMark} class="w-6 h-6" />
				</span>
			{/if}
			<span class="flex-auto">Großbuchstabe verwendet</span>
		</li>
		<li>
			{#if containsNumber}
				<span class="badge-icon variant-filled-success w-4 h-4">
					<Icon src={Check} class="w-6 h-6" />
				</span>
			{:else}
				<span class="badge-icon variant-filled-error w-4 h-4">
					<Icon src={XMark} class="w-6 h-6" />
				</span>
			{/if}
			<span class="flex-auto">Nummer verwendet</span>
		</li>
		<li>
			{#if containsSpecialCharacter}
				<span class="badge-icon variant-filled-success w-4 h-4">
					<Icon src={Check} class="w-6 h-6" />
				</span>
			{:else}
				<span class="badge-icon variant-filled-error w-4 h-4">
					<Icon src={XMark} class="w-6 h-6" />
				</span>
			{/if}
			<span class="flex-auto">Sonderzeichen verwendet</span>
		</li>
		<!-- 	{:else}
		{#if passwordsMatch}
			<span class="badge-icon variant-filled-success w-4 h-4">
				<Icon src={Check} class="w-6 h-6" />
			</span>
		{:else}
			<span class="badge-icon variant-filled-error w-4 h-4">
				<Icon src={XMark} class="w-6 h-6" />
			</span>
		{/if}
		<span class="flex-auto">Passwort wiederholen</span> -->
	{/if}
</ol>
