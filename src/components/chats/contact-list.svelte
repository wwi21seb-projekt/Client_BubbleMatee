<script lang="ts">
	import { goto } from '$app/navigation';
	import { ErrorAlert, NewChatsList, NothingFoundComponent } from '$components';
	import type {
		Author,
		Chat,
		Chats,
		ChatsResponse,
		ErrorObject,
		ErrorResponse,
		Notification
	} from '$domains';
	import Person from '$lib/assets/person.png';
	import { getErrorMessage } from '$utils';
	import { Avatar, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalComponent, ModalSettings, ModalStore } from '@skeletonlabs/skeleton';
	import { Plus } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { hasNotifications, notifications } from '$stores';

	const modalStore: ModalStore = getModalStore();

	export let data: ChatsResponse | ErrorResponse;
	export let chatId: string = '';
	export let chatPartner: Author = {
		username: '',
		picture: { url: '', width: 0, height: 0 },
		nickname: ''
	};

	$: messageNotifications = $notifications.filter(
		(notification) => notification.notificationType === 'message'
	);
	$: chats = data.error
		? null
		: (mapChatsWithReadChat(data.data as Chats, messageNotifications) as Array<ChatRead>);
	$: error = data.error ? (data.data as ErrorObject) : null;

	let errorMessage: string = '';
	onMount(() => {
		errorMessage = error ? getErrorMessage(error.error.code, true) : '';
	});

	interface ChatRead extends Chat {
		newMessages: number;
	}

	function mapChatsWithReadChat(
		chats: Chats,
		messageNotifications: Array<Notification>
	): ChatRead[] {
		const chatsWithReadChat: ChatRead[] = chats.records.map((chat) => {
			const chatRead: ChatRead = {
				...chat,
				newMessages: getNumberOfNewMessages(chat.user.username, messageNotifications)
			};
			return chatRead;
		});
		return chatsWithReadChat;
	}

	function getNumberOfNewMessages(
		username: string,
		messageNotifications: Array<Notification>
	): number {
		const chat: Notification[] = messageNotifications.filter(
			(notification) => notification.user.username === username
		);
		return chat.length;
	}

	const clickOnChat: (person: ChatRead) => Promise<void> = async (person: ChatRead) => {
		const notificationsToDelete: Array<Notification> = messageNotifications.filter(
			(notification) => notification.user.username === person.user.username
		);
		await Promise.all(
			notificationsToDelete.map((notification) =>
				deleteNotificationRequest(notification.notificationId)
			)
		);
		goto(`/chats/${person.chatId}`);
		chatId = person.chatId;
		chatPartner = person.user;
	};

	const onNewChat: () => void = () => {
		const modalComponent: ModalComponent = {
			ref: NewChatsList
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			backdropClasses:
				'bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 lg:dark:from-transparent lg:darkto-transparent lg:from-transparent lg:to-transparent'
		};
		modalStore.trigger(modal);
	};

	async function deleteNotificationRequest(notificationId: string | undefined) {
		try {
			const response: Response = await fetch(`/api/notifications/${notificationId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const body = await response.json();
			const notificationsNew: Array<Notification> = $notifications.filter(
				(notification) => notification.notificationId !== notificationId
			);
			notifications.set([...notificationsNew]);
			if (notificationsNew.length === 0) {
				hasNotifications.set(false);
			}

			return body;
		} catch (e) {
			console.error(e);
		}
	}
</script>

{#if error}
	<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
		<ErrorAlert message={errorMessage} />
	</main>
{:else}
	<div class="w-full flex flex-col border-r border-surface-500/30">
		<div class="{chatId ? 'hidden' : ''} lg:grid grid-rows-[auto_1fr_auto]">
			<!-- List -->
			<div class="p-4 px-0 space-y-4 w-full overflow-hidden">
				<div class="flex justify-between items-center">
					<p class="opacity-50 ml-8 w-full mx-auto hidden sm:block text-lg md:text-xl">Kontakte</p>
					<button
						type="button"
						class="btn variant-filled-primary mr-2 ml-7 md:ml-0"
						on:click={onNewChat}
					>
						<p>Neuer Chat</p>
						<Icon src={Plus} class="h-4 font-bold hover:stroke-gray-400" />
					</button>
				</div>
				<div style="height: 75vh;" class="flex flex-col overflow-auto space-y-1 px-2 w-full">
					{#if chats && chats?.length > 0}
						{#each chats as person (person.chatId)}
							<button
								disabled={$page.params.username === person.user.username}
								type="button"
								class="btn w-full flex items-center justify-start {person.chatId === chatId
									? 'variant-filled-primary'
									: 'bg-surface-hover-token'}"
								on:click={() => clickOnChat(person)}
							>
								<Avatar
									src={person.user.picture && person.user.picture.url
										? person.user.picture.url
										: Person}
									height="auto"
									class="w-12 md:w-16 shrink"
								/>
								<div
									class="flex flex-col w-[calc(100% - 100px)] text-start overflow-hidden"
									style="width: calc(100% - 100px);"
								>
									<h3 class="ml-2 font-bold text-xl md:text-2xl text-start w-full">
										{person.user.username}
									</h3>
									<small class="ml-2 text-sm md:text-base text-start w-full"
										>{person.user.nickname}</small
									>
								</div>
								{#if person.newMessages > 0}
									<span class="badge-icon variant-filled-warning -top-0 -right-0 z-10 w-6 h-6"
										>{person.newMessages}</span
									>
								{/if}
							</button>
						{/each}
						<div class="grow"></div>
					{:else}
						<div class="flex justify-center mx-4">
							<NothingFoundComponent
								message="Keine Chats vorhanden"
								submessage="Nutze 'Neuer Chat' um eine Konversation zu starten"
							/>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
