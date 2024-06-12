<script lang="ts">
	import { goto } from '$app/navigation';
	import { UserInfoStep, PasswordStep, ProfileImageInputStep } from '$components';
	import { getErrorMessage } from '$utils';
	import { Stepper, type ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { uploadedImageUrl } from '$stores';

	const toastStore = getToastStore();

	let email: string;
	let password: string;
	let passwordRepeat: string;
	let username: string;
	let nickname: string;

	let loading: boolean = false;

	const handleSubmit = async () => {
		loading = true;
		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password,
					username: username,
					nickname: nickname,
					profilePicture: $uploadedImageUrl // base64 optional "" wenn nicht vorhanden
				})
			});

			console.log(
				JSON.stringify({
					email: email,
					password: password,
					username: username,
					nickname: nickname,
					profilePicture: $uploadedImageUrl // base64 optional "" wenn nicht vorhanden
				})
			);

			const body = await response.json();

			if (body.error) {
				const t: ToastSettings = {
					message: getErrorMessage(body.data.error.code, false),
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
			} else {
				goto('/login/verify?username=' + body.data.username);
			}

			return body;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	};
</script>

<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
	<div class="flex justify-center">
		<h1 class="h1 mb-8">Registrieren</h1>
	</div>
	<Stepper
		buttonBackLabel="Zurück"
		buttonNextLabel="Weiter"
		stepTerm="Schritt"
		buttonCompleteLabel={loading ? 'Lädt...' : 'Registrieren'}
		on:complete={handleSubmit}
	>
		<UserInfoStep bind:email bind:nickname bind:username />
		<ProfileImageInputStep />
		<PasswordStep bind:password bind:passwordRepeat {loading} />
	</Stepper>
	<div class="flex justify-center p-4">
		<p>
			Bereits registriert? <a class="dark:text-primary-500 text-secondary-500" href="/login"
				>Anmelden</a
			>
		</p>
	</div>
</main>
