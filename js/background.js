(function() {
	main = function() {
		chrome.webRequest.onBeforeRequest.addListener(
			function(details) {
				console.log("details.url: " + details.url);
				return {cancel: true};
//				return {cancel: details.url.indexOf("://www.evil.com/") != -1};
			},
			{urls: ["*://www.evil.com/*"]},  // "*://host/*"
//			{urls: ["<all_urls>"]},  // "*://host/*"
			["blocking"]
		);

		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			console.log("background!");
			if (request.action) {
				switch (request.action) {
					case "startTrack":
						console.log("startTrack");
						break;
					case "stopTrack":
						console.log("stopTrack");
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

