(function() {
	main = function() {
		this.logDebug = function(msg) {
			console.log("[background] " + msg);
		};

		this.KEY_URL_INFOS = "key_urlInfos";
		this.KEY_BLOCKED_LOG = "key_blockedLog";

		this.getTimeString = function() {
			var d = new Date();
			return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.toLocaleTimeString();
		},

		// A handler to handle BeforeRequest
		this.requestBlockFunction = function(details) {
			this.logDebug("Blocked URL: " + details.url);
			this.incrementBlockedCount(details.url);
			return {cancel: true};
		};

		this.incrementBlockedCount = function(blockedUrl) {
			var key = this.KEY_URL_INFOS;
			var log_key = this.KEY_BLOCKED_LOG;
			var formatUrl = this.formatUrl;
			var time = this.getTimeString();
			chrome.storage.sync.get([key, log_key], function(items) {
				var urlInfos = JSON.parse(items[key]);
				var urls = [];
				var needSave = false;

				var blockedLogInfos = JSON.parse(items[log_key] || "null") || [];

				urlInfos.forEach(function(urlInfo, index) {
					var formattedBlockedUrl = formatUrl(blockedUrl);
					if (formattedBlockedUrl === urlInfo.formattedUrl) {
						urlInfo.blocked++; // increment
						blockedLogInfos.push({
							url: urlInfo.url,
							formattedUrl: urlInfo.formattedUrl,
							time: time
						});
						needSave = true;
					}
				}, this);

				if (needSave) {
					var object = {};
					object[key] = JSON.stringify(urlInfos);
					object[log_key] = JSON.stringify(blockedLogInfos);
					chrome.storage.sync.set(object, function() {
						console.log("saved:");
						console.log(object);
					});
				}
			});
		};

		// url: "http://www.google.com/", "http://www.aaa.bbb/CCC/DDD?a=b&p=q", etc.
		//  ->> "*://www.google.com/*", "*://www.aaa.bbb/*", etc.
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

							// Save formatted URL
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

