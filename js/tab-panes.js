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
