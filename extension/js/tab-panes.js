angular.module('tab-panes', ['util-services'])

	.controller('ListPaneCtrler', ['$scope', 'StoreItemFactory', function($scope, StoreItemFactory) {
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
			this.urlInfos.push({ url: this.addedUrl, blocked: 0 });
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
	}])
	
	.controller('TimePaneCtrler', ['$scope', 'StoreItemFactory', function($scope, StoreItemFactory) {
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

		this.saveTimes = function(isSaveLog) {
			StoreItemFactory.saveItem(
				[this.KEY_START_TIME, this.KEY_STOP_TIME, this.KEY_DIFF_TIME],
				[angular.toJson(this.startTime), angular.toJson(this.stopTime), angular.toJson(this.diffTime)]
			);

			if (isSaveLog) {
				var KEY_TIME_LOG = "key_timeLog";
				this.timeLogInfos = [];
				var t = this;
				StoreItemFactory.loadItem([KEY_TIME_LOG], ["timeLogInfos"], [], $scope, this, function() {
					t.timeLogInfos.push({
						startTime: t.startTime,
						stopTime: t.stopTime,
						diffTime: t.diffTime
					});
					StoreItemFactory.saveItem([KEY_TIME_LOG], [angular.toJson(t.timeLogInfos)]);
				});
			}
		};

		this.resetTimes = function() {
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
			this.resetTimes();
			this.startTime = this.getTime();
			this.saveTimes();

			chrome.runtime.sendMessage({action: "startTrack", urls: []});
		};

		this.stopTrack = function() {
			chrome.runtime.sendMessage({action: "stopTrack"});

			this.stopTime = this.getTime();
			this.updateDiffTime();
			this.saveTimes(true);
		};
		
		this.updateDiffTime = function() {
			this.diffTime.hours = this.stopTime.hours - this.startTime.hours;
			this.diffTime.minutes = this.stopTime.minutes - this.startTime.minutes;
		};

		// init
		this.loadTimes();
	}])

	.controller('TimeLogPaneCtrler', ['$scope', 'StoreItemFactory', function($scope, StoreItemFactory) {
		this.KEY_TIME_LOG = "key_timeLog";

		this.timeLogInfos = [];
		// timeLogInfos = [
		// 	{
		// 		startTime: { hours: "2", minutes: "0" },
		// 		stopTime:  { hours: "2", minutes: "30" },
		// 		diffTime:  { hours: "0", minutes: "30" }
		// 	}
		// ];

		this.loadTimeLogs = function() {
			StoreItemFactory.loadItem([this.KEY_TIME_LOG], ["timeLogInfos"], [], $scope, this);
		};

		// init
		this.loadTimeLogs();
	}])

	.controller('BlockedLogPaneCtrler', ['$scope', 'StoreItemFactory', function($scope, StoreItemFactory) {
		this.KEY_BLOCKED_LOG = "key_blockedLog";

		this.blockedLogInfos = [];
		// blockedLogInfos = [
		// 	{
		// 		url: "http://sample.com/",
		// 		formattedUrl: "*://sample.com/*",
		// 		time: "2015-5-16 02:12:55"
		// 	}
		// ];

		this.loadBlockedLogs = function() {
			StoreItemFactory.loadItem([this.KEY_BLOCKED_LOG], ["blockedLogInfos"], [], $scope, this);
		};

		// init
		this.loadBlockedLogs();
	}])

	.filter('reverse', function() {
		return function(items) {
			return items.slice().reverse();
		};
	})

	.directive('listPane', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/list-pane.html',
			controller: 'ListPaneCtrler',
			controllerAs: 'listPane'
		};
	})

	.directive('timePane', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/time-pane.html',
			controller: 'TimePaneCtrler',
			controllerAs: 'timePane'
		};
	})

	.directive('timeLogPane', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/time-log-pane.html',
			controller: 'TimeLogPaneCtrler',
			controllerAs: 'timeLogPane'
		};
	})

	.directive('blockedLogPane', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/blocked-log-pane.html',
			controller: 'BlockedLogPaneCtrler',
			controllerAs: 'blockedLogPane'
		};
	})

