angular.module('tab-panes', [])

	.directive('listPane', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/list-pane.html',
			controller: function() {
				this.urlInfos = [
					{url: "http://evel01.url/"},
					{url: "http://evel02.url/"},
					{url: "http://evel03.url/"}
				];
			},
			cntrollerAs: 'listPane'
		};
	})
