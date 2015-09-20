angular.module('tab-panes', [])

	.directive('listPane', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/list-pane.html',
			controller: function() {
				this.urlInfos = [
					{ url: 'http://evel01.url/' },
					{ url: 'http://evel02.url/' },
					{ url: 'http://evel03.url/' }
				];

				this.selectedUrl = null;

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
			controller: function() {
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
				this.resetTime();

				this.startTrack = function() {
					this.resetTime();
					this.startTime = this.getTime();
					chrome.runtime.sendMessage({action: "startTrack"});
				};

				this.stopTrack = function() {
					chrome.runtime.sendMessage({action: "stopTrack"});
					this.stopTime = this.getTime();
					this.updateDiffTime();
				};
				
				this.updateDiffTime = function() {
					this.diffTime.hours = this.stopTime.hours - this.startTime.hours;
					this.diffTime.minutes = this.stopTime.minutes - this.startTime.minutes;
				};
			},
			controllerAs: 'timePane'
		};
	})

