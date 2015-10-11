describe('tab-panes TimeLogPaneCtrler', function() {
	var $rootScope;
	var $controller;
	beforeEach(module('popupApp'));
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		$rootScope = _$rootScope_;
		$controller = _$controller_;
	}));

	function StoreItemFactoryMock() {
		return {
			loadItem: function(keys, stores, default_value, scope, that, callback) {
				// Use "$apply" because angular doesn't know this turn.
				scope.$apply(function() {
					var items = {
						key_logUrlInfos: [
							{"url":"", "date":"", "time":""},
							{"url":"", "date":"", "time":""},
							{"url":"", "date":"", "time":""},
							{"url":"", "date":"", "time":""},
							{"url":"", "date":"", "time":""}
						]
					};
					angular.forEach(items, function(item, key) {
						var store = stores[keys.indexOf(key)];
						that[store] =  (item != null) ? angular.fromJson(item) : default_value;
					});
					if (callback)
						callback();
				});
			},

			/*
			 * saveItem
			 */
			saveItem: function(keys, stringValues) {
			}
		};
	};

	it('should load time log objects.', function() {
		var timeLogPaneCtrler = $controller('TimeLogPaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
		timeLogPaneCtrler.loadUrlLogs();
	});

	it('should save time log objects.', function() {
		var timeLogPaneCtrler = $controller('TimeLogPaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
		timeLogPaneCtrler.saveUrlLogs();
	});

});

