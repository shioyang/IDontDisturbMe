angular.module('tab-panes', ['util-services'])

	.directive('listPane', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/list-pane.html',
			controller: function($scope) {
				this.KEY_URL_INFOS = "key_urlInfos";

				this.urlInfos = [
					{ url: 'http://evel01.url/' },
					{ url: 'http://evel02.url/' },
					{ url: 'http://evel03.url/' }
				];

				this.selectedUrl = null;

//				this.loadUrls = function() {
//					this.loadItem();
//				};

				this.addUrl = function() {
					console.log(this.addedUrl);
					this.urlInfos.push({ url: this.addedUrl });
					this.addedUrl = ""; //clear
				};

				this.setSelected = function(url) {
					this.selectedUrl = url;
				};

				this.removeSelectedUrl = function() {
					if (this.selectedUrl != null) {
						var index = this.urlInfos.indexOf(this.selectedUrl);
						if (0 <= index) {
							this.urlInfos.splice(index, 1);
							this.selectedUrl = null;
						}
					}
				};
			},
			controllerAs: 'listPane'
		};
	})

	.directive('timePane', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/time-pane.html',
			controller: ['$scope', 'StoreItemFactory', function($scope, StoreItemFactory) {
				this.KEY_START_TIME = "key_startTime";
				this.KEY_STOP_TIME = "key_stopTime";
				this.KEY_DIFF_TIME = "key_diffTime";

				this.startTime = null;
				this.stopTime = null;
				this.diffTime = null;


				this.getTime = function() {
					var d = new Date();
					return {
						hours: d.getHours(),
						minutes: d.getMinutes()
					};
				};

				this.loadTimes = function() {
					console.log("loadTimes");
					StoreItemFactory.loadItem([this.KEY_START_TIME, this.KEY_STOP_TIME, this.KEY_DIFF_TIME], ["startTime", "stopTime", "diffTime"],
						{ hours: "--", minutes: "--" }, $scope, this);
				};

				this.saveTimes = function() {
					this.saveItem(
						[this.KEY_START_TIME, this.KEY_STOP_TIME, this.KEY_DIFF_TIME],
						[angular.toJson(this.startTime), angular.toJson(this.stopTime), angular.toJson(this.diffTime)]
					);
				};
				this.saveItem = function(keys, stringValues) {
					var object = {};
					angular.forEach(keys, function(key) {
						var value = stringValues[keys.indexOf(key)];
						object[key] = value;
					});
					chrome.storage.sync.set(object, function() {
						console.log("saved:");
						console.log(object);
					});
				};

				this.resetTime = function() {
					this.startTime = {
						hours: "--",
						minutes: "--"
					};
					this.stopTime = {
						hours: "--",
						minutes: "--"
					};
					this.diffTime = {
						hours: "--",
						minutes: "--"
					};
				};

				this.startTrack = function() {
					this.resetTime();
					this.startTime = this.getTime();
					chrome.runtime.sendMessage({action: "startTrack"});
					this.saveTimes();
				};

				this.stopTrack = function() {
					chrome.runtime.sendMessage({action: "stopTrack"});
					this.stopTime = this.getTime();
					this.updateDiffTime();
					this.saveTimes();
				};
				
				this.updateDiffTime = function() {
					this.diffTime.hours = this.stopTime.hours - this.startTime.hours;
					this.diffTime.minutes = this.stopTime.minutes - this.startTime.minutes;
				};

				// init
				this.loadTimes();
			}],
			controllerAs: 'timePane'
		};
	})

