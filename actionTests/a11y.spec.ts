const pa11y = require('pa11y');

(async function () {
	try {
		const result = await pa11y('http://localhost:5173', {
			includeWarnings: true,
			level: 'error',
			runners: ['htmlcs']
		});

		console.log(result);
	} catch (e) {
		throw new Error(e);
	}
})();
