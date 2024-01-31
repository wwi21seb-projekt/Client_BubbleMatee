import type { UserInfo } from "$domains";


export async function subscribe(username: string) {
    const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ following: username })
    });

    const body = await response.json();

    return body;
}

export async function unsubscribe(id: string, username: string) {
    const response = await fetch(`/api/subscriptions/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ following: username })
    });

    const body = await response.json();
}