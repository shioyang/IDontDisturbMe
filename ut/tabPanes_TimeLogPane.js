describe('tab-panes TimeLogPaneCtrler', function() {
	var $rootScope;
	var $controller;
	beforeEach(module('popupApp'));
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		$rootScope = _$rootScope_;
		$controller = _$controller_;
	}));

	var MOCK_INFO_0_START_HOURS = "02";
	var MOCK_INFO_0_START_MINS = "00";

	var MOCK_INFO_1_START_HOURS = "02";
	var MOCK_INFO_1_START_MINS = "00";

	var MOCK_INFO_2_START_HOURS = "02";
	var MOCK_INFO_2_START_MINS = "00";

	var MOCK_INFO_0_STOP_HOURS   = "03";
	var MOCK_INFO_0_STOP_MINS   = "00";

	var MOCK_INFO_1_STOP_HOURS   = "03";
	var MOCK_INFO_1_STOP_MINS   = "30";

	var MOCK_INFO_2_STOP_HOURS   = "04";
	var MOCK_INFO_2_STOP_MINS   = "00";

	var MOCK_INFO_0_DIFF_HOURS  = "01";
	var MOCK_INFO_0_DIFF_MINS  = "00";

	var MOCK_INFO_1_DIFF_HOURS  = "01";
	var MOCK_INFO_1_DIFF_MINS  = "30";

	var MOCK_INFO_2_DIFF_HOURS  = "02";
	var MOCK_INFO_2_DIFF_MINS  = "00";

	function StoreItemFactoryMock() {
		return {
			loadItem: function(keys, stores, default_value, scope, that, callback) {
				// Use "$apply" because angular doesn't know this turn.
				scope.$apply(function() {
					var items = {
						"key_timeLog": [
							{
								"startTime":{"hours":MOCK_INFO_0_START_HOURS,"minutes":MOCK_INFO_0_START_MINS},
								"stopTime": {"hours":MOCK_INFO_0_STOP_HOURS, "minutes":MOCK_INFO_0_STOP_MINS},
								"diffTime": {"hours":MOCK_INFO_0_DIFF_HOURS, "minutes":MOCK_INFO_0_DIFF_MINS}
							},
							{
								"startTime":{"hours":MOCK_INFO_1_START_HOURS,"minutes":MOCK_INFO_1_START_MINS},
								"stopTime": {"hours":MOCK_INFO_1_STOP_HOURS, "minutes":MOCK_INFO_1_STOP_MINS},
								"diffTime": {"hours":MOCK_INFO_1_DIFF_HOURS, "minutes":MOCK_INFO_1_DIFF_MINS}},
							{
								"startTime":{"hours":MOCK_INFO_2_START_HOURS,"minutes":MOCK_INFO_2_START_MINS},
								"stopTime": {"hours":MOCK_INFO_2_STOP_HOURS, "minutes":MOCK_INFO_2_STOP_MINS},
								"diffTime": {"hours":MOCK_INFO_2_DIFF_HOURS, "minutes":MOCK_INFO_2_DIFF_MINS}
							}
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
		var TimeLogPaneCtrler = $controller('TimeLogPaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
		TimeLogPaneCtrler.loadTimeLogs();
		expect( TimeLogPaneCtrler.timeLogInfos[0].startTime.hours  ).toEqual( MOCK_INFO_0_START_HOURS );
		expect( TimeLogPaneCtrler.timeLogInfos[1].stopTime.minutes ).toEqual( MOCK_INFO_1_STOP_MINS   );

		expect( TimeLogPaneCtrler.timeLogInfos[2].diffTime.hours   ).toEqual( MOCK_INFO_2_DIFF_HOURS );
		expect( TimeLogPaneCtrler.timeLogInfos[2].diffTime.minutes ).toEqual( MOCK_INFO_2_DIFF_MINS  );
	});

});

