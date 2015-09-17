angular.module('components', ['tab-panes'])

	.directive('tabs', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/tabs.html',
			controller: function() {
				this.currentTab = 0;

				this.setTab = function(tabNum) {
					this.currentTab = tabNum;
				};

				this.isSet = function(tabNum) {
					return this.currentTab === tabNum;
				};
			},
			controllerAs: 'tab'
		};
	})

