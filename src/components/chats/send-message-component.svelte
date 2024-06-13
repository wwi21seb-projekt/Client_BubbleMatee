<script lang="ts">
	import { PaperAirplane } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { sendMessage, storeUnsendMessage } from '$stores';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		getToastStore,
		popup,
		type PopupSettings,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import { getErrorMessage } from '$utils';
	export let username: string;
	export let chatPartnerUsername: string;
	const toastStore = getToastStore();

	let currentMessage: string = '';
	let textarea: HTMLTextAreaElement;

	// CSS class names for different text states
	const classNormal = ' dark:from-tertiary-500 dark:to-secondary-500';
	const classWarning = 'text-warning-500';
	const classMaxReached = 'text-error-500';

	// Character limit for showing a warning
	const charsWarning = 50;
	const maxChars = 256;

	$: classtext =
		currentMessage.length > maxChars - charsWarning && currentMessage.length < maxChars
			? classWarning
			: currentMessage.length >= maxChars
				? classMaxReached
				: classNormal;

	async function createNewChat() {
		try {
			const response = await fetch('/api/chats', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: chatPartnerUsername,
					content: currentMessage
				})
			});

			const body = await response.json();

			if (body.error) {
				const t: ToastSettings = {
					message: getErrorMessage(body.data.error.code, false),
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
			} else {
				let chatId = body.data.chatId;
				goto(`/home/chats/${chatId}`);
			}

			return body;
		} catch (e) {
			console.error(e);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			onSendMessage();
		}
	}

	function onSendMessage(): void {
		if ($page.url.pathname.includes('newChat')) {
			createNewChat();
			return;
		}

		if (currentMessage && currentMessage.length > 0) {
			storeUnsendMessage({
				content: currentMessage,
				username: username,
				creationDate: new Date().toISOString()
			});
			sendMessage(currentMessage);
		}
		currentMessage = '';
		textarea.style.height = 'auto'; // Setzt die Höhe des Textfelds zurück
	}

	function autoResize(event: Event) {
		const target = event.target as HTMLTextAreaElement;
		target.style.height = 'auto';
		target.style.height = target.scrollHeight + 'px';
	}

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};
</script>

<section class="border-t border-surface-500/30 p-4">
	<div
		class="input-group input-group-divider grid-cols-[auto_1fr_auto] max-h-10 rounded-container-token"
	>
		<button class="input-group-shim" use:popup={popupHover}>
			<div class={classtext}>{maxChars - currentMessage.length}</div>
		</button>
		<textarea
			bind:value={currentMessage}
			bind:this={textarea}
			class="bg-transparent border-0 ring-0 overflow-y-auto max-h-10 {classtext}"
			name="prompt"
			id="prompt"
			placeholder={`Ihre Chat-Nachricht darf maximal ${maxChars} lang sein`}
			maxlength={maxChars}
			rows="1"
			on:keydown={handleKeydown}
			on:input={autoResize}
		></textarea>
		<button
			class={currentMessage ? 'variant-filled-primary' : 'input-group-shim'}
			on:click={onSendMessage}
		>
			<Icon src={PaperAirplane} class="h-8 md:h-10 font-bold hover:stroke-gray-400" />
		</button>
	</div>
</section>

<div class="card p-4 variant-filled-secondary" data-popup="popupHover">
	<p>Verbleibende Menge der möglichen Zeichen</p>
	<div class="arrow variant-filled-secondary" />
</div>
