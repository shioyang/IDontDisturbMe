angular.module('tab-panes', ['util-services'])

	.directive('listPane', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/list-pane.html',
			controller: ['$scope', 'StoreItemFactory', function($scope, StoreItemFactory) {
				this.KEY_URL_INFOS = "key_urlInfos";

				this.urlInfos = [];

				this.selectedUrl = null;

				this.loadUrls = function() {
					StoreItemFactory.loadItem([this.KEY_URL_INFOS], ["urlInfos"], [], $scope, this);
				};

				this.saveUrls = function() {
					StoreItemFactory.saveItem([this.KEY_URL_INFOS], [angular.toJson(this.urlInfos)]);
				};

				this.addUrl = function() {
					console.log(this.addedUrl);
					this.urlInfos.push({ url: this.addedUrl });
					this.saveUrls();
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
						this.saveUrls();
					}
				};

				// init
				this.loadUrls();
			}],
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
					var t = this;
					StoreItemFactory.loadItem([this.KEY_START_TIME, this.KEY_STOP_TIME, this.KEY_DIFF_TIME],
						["startTime", "stopTime", "diffTime"], { hours: "--", minutes: "--" }, $scope, this);
				};

				this.saveTimes = function() {
					StoreItemFactory.saveItem(
						[this.KEY_START_TIME, this.KEY_STOP_TIME, this.KEY_DIFF_TIME],
						[angular.toJson(this.startTime), angular.toJson(this.stopTime), angular.toJson(this.diffTime)]
					);
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
					this.saveTimes();

					chrome.runtime.sendMessage({action: "startTrack", urls: []});
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

