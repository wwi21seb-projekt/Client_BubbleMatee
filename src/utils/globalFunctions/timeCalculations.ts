/**
 * Checks the validity of password-related input.
 *
 * @param date DateTime in UTC.
 * @returns String with time that has passed in Minutes/ Hours/ Days or Weeks
 */
export function calculatePassedTime(date: Date) {
	// Current date and time in UTC
	const now: Date = new Date();
	const nowUTC: Date = new Date(now.toUTCString());
	// Difference in milliseconds
	const differenceInMS = nowUTC.getTime() - date.getTime();
	// Calculate difference in minutes, hours, days, and weeks
	const differenceInMinutes = Math.ceil(differenceInMS / (1000 * 60));
	const differenceInHours = Math.ceil(differenceInMS / (1000 * 60 * 60));
	const differenceInDays = Math.ceil(differenceInMS / (1000 * 60 * 60 * 24));
	const differenceInWeeks = Math.ceil(differenceInMS / (1000 * 60 * 60 * 24 * 7));

	// Make decisions on how to represent the time
	if (differenceInMinutes < 60) {
		return differenceInMinutes + ' Minuten';
	} else if (differenceInHours < 24) {
		return differenceInHours + ' Stunden';
	} else if (differenceInDays < 7) {
		return differenceInDays + ' Tagen';
	} else {
		return differenceInWeeks + ' Wochen';
	}
}
