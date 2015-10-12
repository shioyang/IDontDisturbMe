describe('tab-panes BlockedLogPaneCtrler', function() {
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
						key_logBlockedInfos: [
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
		var BlockedLogPaneCtrler = $controller('BlockedLogPaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
		BlockedLogPaneCtrler.loadBlockedLogs();
	});

	it('should save time log objects.', function() {
		var BlockedLogPaneCtrler = $controller('BlockedLogPaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
		BlockedLogPaneCtrler.saveBlockedLogs();
	});

});

