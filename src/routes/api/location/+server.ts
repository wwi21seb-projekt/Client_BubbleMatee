import type { ErrorResponse, LocationResponse } from '$domains';
import { PRIVATE_GEO_API_KEY } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles GET requests to retrieve location information.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @returns The response containing location data or an error. Note that we only search for cities. If the coordinates are in the middle of the ocean, nothing is returned
 */
export const GET: RequestHandler = async ({ fetch, url }) => {
	const long: string = url.searchParams.get('long')!;
	const lat: string = url.searchParams.get('lat')!;

	try {
		const response = await fetch(
			`https://api.geoapify.com/v1/geocode/reverse?lon=${long}&lat=${lat}&apiKey=${PRIVATE_GEO_API_KEY}&lang=de&type=city`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		const body = await response.json();

		if (response.ok) {
			//if there are results -> return them
			console.log(body.features.length > 0);
			if (body.features.length > 0) {
				return json({
					error: false,
					data: {
						longitude: long,
						latitude: lat,
						country: body.features[0].properties.country,
						city: body.features[0].properties.city
					}
				} as LocationResponse);
			}
			// if there are no results -> return with empty city and country
			return json({
				error: false,
				data: {
					longitude: long,
					latitude: lat,
					country: '',
					city: ''
				}
			} as LocationResponse);
		}
		return json({
			error: true,
			data: {
				error: {
					code: body.statusCode,
					message: body.message
				}
			}
		} as ErrorResponse);
	} catch (exception) {
		return json({
			error: true,
			data: {
				error: {
					code: '500',
					message: 'Internal Server Error'
				}
			}
		} as ErrorResponse);
	}
};
