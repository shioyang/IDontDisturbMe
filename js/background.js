(function() {
	main = function() {
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			console.log("background!");
			if (request.action === "start") {
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
			}
		});
	};

	main();
}).call(this);

