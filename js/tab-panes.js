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

				this.addUrl = function() {
					console.log(this.addedUrl);
					this.addedUrl = ""; //clear
				};
			},
			controllerAs: 'listPane'
		};
	})
