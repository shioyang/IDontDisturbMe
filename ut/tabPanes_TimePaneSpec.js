describe('tab-panes TimePaneCtrler', function() {
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
						key_diffTime: {"hours":2,"minutes":0},
						key_startTime: {"hours":18,"minutes":00},
						key_stopTime: {"hours":20,"minutes":00}
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

	it('should get current time object.', function() {
		var timePaneCtrler = $controller('TimePaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
		var currentTime = timePaneCtrler.getTime();
		expect( currentTime.hours ).not.toBe(null);
		expect( currentTime.minutes ).not.toBe(null);
	});

});

