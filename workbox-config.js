module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{vue,css,ts,png,svg,js}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};