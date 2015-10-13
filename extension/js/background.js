(function() {
	main = function() {
		this.logDebug = function(msg) {
			console.log("[background] " + msg);
		};

		this.KEY_URL_INFOS = "key_urlInfos";

		// A handler to handle BeforeRequest
		this.requestBlockFunction = function(details) {
			this.logDebug("Blocked URL: " + details.url);
			return {cancel: true};
		};

		// url: "http://www.google.com/", etc.
		//  ->> "*://www.google.com/*", etc.
		this.formatUrl = function(url) {
			var re = /^https?:\/\/([\w.]+)\/.*/;
			return url.replace(re, "*://$1/*");
		};

		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			if (request.action) {
				switch (request.action) {
					case "startTrack":
						this.logDebug("startTrack");
						var key = this.KEY_URL_INFOS;
						var formatUrl = this.formatUrl;
						var requestBlockFunction = this.requestBlockFunction;
						chrome.storage.sync.get(key, function(items) {
							var urlInfos = JSON.parse(items[key]);
							var urls = [];
							urlInfos.forEach(function(urlInfo, index) {
								var formatted = formatUrl(urlInfo.url);  // "*://host/*"
								urls.push(formatted);  // "*://host/*"
								urlInfo.formattedUrl = formatted;
							}, this);

							if (urls.length > 0) {
								chrome.webRequest.onBeforeRequest.addListener(
									requestBlockFunction,
									{urls: urls},  // "*://host/*"
									["blocking"]
								);
							}

							var object = {};
							object[key] = JSON.stringify(urlInfos);
							chrome.storage.sync.set(object, function() {
								console.log("saved:");
								console.log(object);
							});
						});
						break;
					case "stopTrack":
						this.logDebug("stopTrack");
						chrome.webRequest.onBeforeRequest.removeListener(
							this.requestBlockFunction
						);
						break;
					case "restartTrack":
						this.logDebug("restartTrack");
						this.logDebug("   !!! under implementation !!!");
						// stopTrack
						// startTrack
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

