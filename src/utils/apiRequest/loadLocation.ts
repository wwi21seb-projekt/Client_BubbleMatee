import type { Error, ErrorResponse, LocationPlace, LocationResponse } from '$domains';

/**
 * Loads the next location given the longitude and latitude
 *
 * @param long - longitude
 * @param lat - latitude
 * @returns a LocationPlace-Object consisting of an Array with all relevant location data
 * @throws an error: type = Error code
 *
 */
export async function fetchLocation(long: string, lat: string): Promise<LocationPlace> {
	const response: Response = await fetch(`/api/location?long=${long}&lat=${lat}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const body: ErrorResponse | LocationResponse = await response.json();
	if (body.error) {
		//handle Error
		const error: Error = (body as ErrorResponse).data.error;
		const message: string = error.message;
		throw new ErrorEvent(message);
	} else {
		const data: LocationPlace = body.data as LocationPlace;
		return data;
	}
}
