
(function() {
	main = function() {
		console.log("content_scripts!");
		chrome.runtime.onMessage.addListener(
			function(request, sender, sendResponse) {
				console.log("onMessage listener");
				if (request.action === "block") {
					console.log("DO BLOCK!!!");
					sendResponse({isSuccess: true});
				}
			}
		);

		chrome.runtime.sendMessage({action: "start", host: location.host});
	};

	main();
}).call(this);

