/**
 * Calculates the time that has passed since a specific date
 *
 * @param date DateTime in UTC.
 * @returns String with time that has passed in Minutes/ Hours/ Days or Weeks
 */
export function calculatePassedTime(date: Date) {
	// Current date and time in UTC
	const now: Date = new Date();
	const nowUTC: Date = new Date(now.toUTCString());
	// Difference in milliseconds
	const differenceInMS: number = nowUTC.getTime() - date.getTime();
	// Calculate difference in minutes, hours, days, and weeks
	const differenceInSeconds: number = Math.ceil(differenceInMS / 1000);
	const differenceInMinutes: number = Math.ceil(differenceInMS / (1000 * 60));
	const differenceInHours: number = Math.ceil(differenceInMS / (1000 * 60 * 60));
	const differenceInDays: number = Math.ceil(differenceInMS / (1000 * 60 * 60 * 24));
	const differenceInWeeks: number = Math.ceil(differenceInMS / (1000 * 60 * 60 * 24 * 7));

	// Make decisions on how to represent the time
	if (differenceInSeconds < 60) {
		return 'wenigen Sekunden';
	} else if (differenceInMinutes < 60 && differenceInMinutes > 1) {
		return `${differenceInMinutes} Minuten`;
	} else if (differenceInMinutes === 1) {
		return `${differenceInMinutes} Minute`;
	} else if (differenceInHours < 24 && differenceInHours > 1) {
		return `${differenceInHours} Stunden`;
	} else if (differenceInHours === 1) {
		return `${differenceInHours} Stunde`;
	} else if (differenceInDays < 7 && differenceInDays > 1) {
		return `${differenceInDays} Tagen`;
	} else if (differenceInDays === 1) {
		return `${differenceInDays} Tag`;
	} else if (differenceInWeeks === 1) {
		return `${differenceInWeeks} Woche`;
	} else {
		return `${differenceInWeeks} Wochen`;
	}
}
