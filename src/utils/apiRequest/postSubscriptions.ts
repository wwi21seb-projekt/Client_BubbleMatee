/**
 * Subscribe to specified user
 *
 * @param username - username of user to be subscribed to
 * @returns a Server Response for Following
 * @throws an error: type = Error code */
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

/**
 * Unsubscribe to specified user
 *
 * @param id - SubscriptionId  to be deleted
 * @param username - username of user to be subscribed to
 * @returns a Server Response for Unfollowing
 * @throws an error: type = Error code */
export async function unsubscribe(id: string, username: string) {
	const response = await fetch(`/api/subscriptions/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ following: username })
	});

	const body = await response.json();

	return body;
}
