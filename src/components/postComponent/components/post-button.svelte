<script lang="ts">
	import { derived } from 'svelte/store';
	import { isFileSelected, postText, files } from '$stores';

    //Import für api
    import { goto } from '$app/navigation';
	import type { Error } from '$domains';
	import { currentUser, loading } from '$stores';
	import { getErrorMessage } from '$utils';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	// Hilfsfunktion zum Entfernen von Leerzeichen und Zeilenumbrüchen
	function removeWhitespaceAndNewlines(text: string): string {
		return text.replace(/\s+/g, '');
	}

	// Der Button ist aktiviert (klickbar), wenn ein Text (nach dem Entfernen von Leerzeichen)
	// eingegeben oder eine Datei ausgewählt wurde
	const inputValid = derived(
		[isFileSelected, postText],
		([$isFileSelected, $postText]) =>
			$isFileSelected || Boolean(removeWhitespaceAndNewlines($postText))
	);

    // API

    async function convertFileToBase64(file:File): Promise<string> {
        return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
        });
    }

    const toastStore = getToastStore();

    
    // Definieren der Typen
    type Author = {
    username: string;
    nickname: string;
    profilePictureUrl: string;
    };

    type MockData = {
    postId: string;
    author: Author;
    creationDate: string;
    content: string;
    imgaeBase64: string;
    };

    // Erstellen der mockData Variable
    var mockData: MockData = {
    postId: "",
    author: {
        username: "",
        nickname: "",
        profilePictureUrl: "", // Sie können hier eine URL einfügen, falls vorhanden
    },
    creationDate: "", // Ersetzen Sie "datetime+UTC" durch das tatsächliche Datum im UTC-Format
    content: "",
    imgaeBase64: "",
    };

    function updateMockDataFromBody(body: any): void {
        if (body.data.postId) mockData.postId = body.data.postId;

        if (body.data.author) {
            mockData.author.username = body.data.author.username ?? mockData.author.username;
            mockData.author.nickname = body.data.author.nickname ?? mockData.author.nickname;
            mockData.author.profilePictureUrl = body.data.author.profilePictureUrl ?? mockData.author.profilePictureUrl;
        }
        if (body.data.creationDate) mockData.creationDate = body.data.creationDate;
        if (body.data.content) mockData.content = body.data.content;
        if (body.data.imgaeBase64) mockData.imgaeBase64 = body.data.imgaeBase64;
    }
    


	const handlePost = async () => {
        if(inputValid){
            loading.set(true);
            try {
                const localFileList = $files; // Nutzung des Stores
                const localIsFileSelected = $isFileSelected; //wurde eine datei ausgewählt
                const localpostText = $postText;
                let imageBase64:string = '';
                
                if(localIsFileSelected){
                    if (localFileList && localFileList.length > 0) {
                        imageBase64 = await convertFileToBase64(localFileList[0])
                        console.log(imageBase64);
                    }
                }

                const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: localpostText,
                    image: imageBase64,
                    user: $currentUser.username,
                    })
                });
                const body = await response.json();
                console.log(body);
                

                if (body.error) {
                    let error: Error = body.data.error;
                    const t: ToastSettings = {
                        message: getErrorMessage(error.code),
                        background: 'variant-filled-error'
                    };
                    toastStore.trigger(t);
                    //TODO: navigate back to tep 1
                } else {
                    updateMockDataFromBody(body);
                    //goto(''); noch auskommentiert zum wechseln der Seite
                }

                return body;
            } catch (e) {
                console.error(e);
            } finally {
                loading.set(false);
            }
        }
	};
</script>

<button
	type="button"
	class="btn btn variant-filled-secondary mt-2 buttonPost"
	disabled={!$inputValid} on:click={handlePost}
>
	<img src="./src/images/icons/paper-plane.png" alt="Icon zum Posten" class="iconImage" />
	<span>Posten</span>
</button>
<div>
    <h1>Post Details</h1>
    <p><strong>Post ID:</strong> {mockData.postId}</p>
    <p><strong>Author Username:</strong> {mockData.author.username}</p>
    <p><strong>Author Nickname:</strong> {mockData.author.nickname}</p>
    <p><strong>Author Profile Picture:</strong> {mockData.author.profilePictureUrl}</p>
    <p><strong>Creation Date:</strong> {mockData.creationDate}</p>
    <p><strong>Content:</strong> {mockData.content}</p>
    <img src={mockData.imgaeBase64} alt="Gesendetes Bild" class="sendedPicture" />
  </div>
<style>
	:root {
		--icon-size: 2.188rem;
	}

	.buttonPost {
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 31.25rem;
		width: 100%;
	}

	.iconImage {
		height: var(--icon-size);
		width: var(--icon-size);
		margin-right: 0.5rem;
	}
</style>
