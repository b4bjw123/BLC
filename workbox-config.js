module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{js,csv,html,css}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};