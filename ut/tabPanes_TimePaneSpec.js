describe('tab-panes TimePaneCtrler', function() {
	var $rootScope;
	var $controller;
	beforeEach(module('popupApp'));
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		$rootScope = _$rootScope_;
		$controller = _$controller_;
	}));

	var MOCK_DIFF_HOURS    =  2;
	var MOCK_DIFF_MINUTES  = 30;
	var MOCK_START_HOURS   = 18;
	var MOCK_START_MINUTES = 00;
	var MOCK_STOP_HOURS    = 20;
	var MOCK_STOP_MINUTES  = 30;

	function StoreItemFactoryMock() {
		return {
			loadItem: function(keys, stores, default_value, scope, that, callback) {
				// Use "$apply" because angular doesn't know this turn.
				scope.$apply(function() {
					var items = {
						key_diffTime:  {"hours":MOCK_DIFF_HOURS, "minutes":MOCK_DIFF_MINUTES},
						key_startTime: {"hours":MOCK_START_HOURS,"minutes":MOCK_START_MINUTES},
						key_stopTime:  {"hours":MOCK_STOP_HOURS, "minutes":MOCK_STOP_MINUTES}
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

	it('should load time objects.', function() {
		var timePaneCtrler = $controller('TimePaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
		timePaneCtrler.loadTimes();
		expect( timePaneCtrler.diffTime.hours    ).toEqual(MOCK_DIFF_HOURS);
		expect( timePaneCtrler.diffTime.minutes  ).toEqual(MOCK_DIFF_MINUTES);
		expect( timePaneCtrler.startTime.hours   ).toEqual(MOCK_START_HOURS);
		expect( timePaneCtrler.startTime.minutes ).toEqual(MOCK_START_MINUTES);
		expect( timePaneCtrler.stopTime.hours    ).toEqual(MOCK_STOP_HOURS);
		expect( timePaneCtrler.stopTime.minutes  ).toEqual(MOCK_STOP_MINUTES);
	});

	it('should save time objects.', function() {
		var timePaneCtrler = $controller('TimePaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
		timePaneCtrler.saveTimes();
	});

	it('should reset time objects.', function() {
		var timePaneCtrler = $controller('TimePaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
		timePaneCtrler.resetTimes();
		expect( timePaneCtrler.startTime.hours   ).toEqual("--");
		expect( timePaneCtrler.startTime.minutes ).toEqual("--");
		expect( timePaneCtrler.stopTime.hours    ).toEqual("--");
		expect( timePaneCtrler.stopTime.minutes  ).toEqual("--");
		expect( timePaneCtrler.diffTime.hours    ).toEqual("--");
		expect( timePaneCtrler.diffTime.minutes  ).toEqual("--");
	});

	// Need a mock for chrome.runtime.sendMessage
//	it('should start track.', function() {
//		var timePaneCtrler = $controller('TimePaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
//	});

//	it('should stop track.', function() {
//		var timePaneCtrler = $controller('TimePaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
//	});

	it('should update diff time.', function() {
		var timePaneCtrler = $controller('TimePaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
		timePaneCtrler.loadTimes();
		timePaneCtrler.stopTime.hours   += 3;
		timePaneCtrler.stopTime.minutes += 7;

		timePaneCtrler.updateDiffTime();

		expect( timePaneCtrler.diffTime.hours   ).toEqual(MOCK_DIFF_HOURS   + 3);
		expect( timePaneCtrler.diffTime.minutes ).toEqual(MOCK_DIFF_MINUTES + 7);
	});

});

