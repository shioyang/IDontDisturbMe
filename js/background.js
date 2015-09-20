(function() {
	main = function() {
		this.logDebug = function(msg) {
			console.log("[background] " + msg);
		};

		// A handler to handle BeforeRequest
		this.requestBlockFunction = function(details) {
			this.logDebug("Blocked URL: " + details.url);
			return {cancel: true};
		};

		// host: "www.google.com", etc.
		this.formatUrl = function(host) {
			return "*://" + host + "/*";
		};

		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			if (request.action) {
				switch (request.action) {
					case "startTrack":
						this.logDebug("startTrack");
						chrome.webRequest.onBeforeRequest.addListener(
							this.requestBlockFunction,
							{urls: ["*://www.evil.com/*"]},  // "*://host/*"
							["blocking"]
						);
						break;
					case "stopTrack":
						this.logDebug("stopTrack");
						chrome.webRequest.onBeforeRequest.removeListener(
							this.requestBlockFunction
						);
						break;
					case "start":
						chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
							console.log("location.host: " + request.host);
							console.log("tabs[0]: " + tabs[0]);
							console.log("tabs[0].url: " + tabs[0].url);
							chrome.tabs.sendMessage(tabs[0].id, {action: "block"}, function(response) {
								if (response.isSuccess)
									console.log("block done.");
								else
									console.log("block failed...");
							});
						});
						break;
					default:
						console.log("Undefined action...");
						break;
				}
			}
		});
	};

	main();
}).call(this);

