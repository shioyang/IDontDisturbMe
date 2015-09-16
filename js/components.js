angular.module('components', [])

	.directive('tabs', function() {
		return {
			restrict: 'E',
			template:
				"<div>" +
					"<ul class='nav nav-tabs'>" +
						"<li ng-class='{ active:tab.isSet(0) }'>" +
							"<a href ng-click='tab.setTab(0)'>Time</a>" +
						"</li>" +
						"<li ng-class='{ active:tab.isSet(1) }'>" +
							"<a href ng-click='tab.setTab(1)'>List</a>" +
						"</li>" +
						"<li ng-class='{ active:tab.isSet(2) }'>" +
							"<a href ng-click='tab.setTab(2)'>Time Log</a>" +
						"</li>" +
						"<li ng-class='{ active:tab.isSet(3) }'>" +
							"<a href ng-click='tab.setTab(3)'>Block Log</a>" +
						"</li>" +
					"</ul>" +
					"<div ng-show='tab.isSet(0)'>" +
						"<h4>Time</h4>" +
					"</div>" +
					"<div ng-show='tab.isSet(1)'>" +
						"<h4>List</h4>" +
					"</div>" +
					"<div ng-show='tab.isSet(2)'>" +
						"<h4>Time Log</h4>" +
					"</div>" +
					"<div ng-show='tab.isSet(3)'>" +
						"<h4>Block Log</h4>" +
					"</div>" +
				"</div>",
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

