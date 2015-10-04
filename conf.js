exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',

	specs: [
		'e2e/testSpec.js'
	],

	exclude: [],

	capabilities: {
		'browserName': 'chrome'
	},

	baseUrl: 'http://localhost:8080/',

	framework: 'jasmine2',

	jasmineNodeOpts: {
		showColors: true
	}
}
