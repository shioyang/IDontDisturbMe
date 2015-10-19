describe('tab-panes TimeLogPaneCtrler', function() {
	var $rootScope;
	var $controller;
	beforeEach(module('popupApp'));
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		$rootScope = _$rootScope_;
		$controller = _$controller_;
	}));

	var MOCK_INFO_0_START_TIME = "00:00";
	var MOCK_INFO_1_START_TIME = "00:00";
	var MOCK_INFO_2_START_TIME = "00:00";
	var MOCK_INFO_0_END_TIME   = "03:00";
	var MOCK_INFO_1_END_TIME   = "03:00";
	var MOCK_INFO_2_END_TIME   = "03:00";
	var MOCK_INFO_0_DIFF_TIME  = "01:00";
	var MOCK_INFO_1_DIFF_TIME  = "01:00";
	var MOCK_INFO_2_DIFF_TIME  = "01:00";

	function StoreItemFactoryMock() {
		return {
			loadItem: function(keys, stores, default_value, scope, that, callback) {
				// Use "$apply" because angular doesn't know this turn.
				scope.$apply(function() {
					var items = {
						"key_TimeLog": [
							{"startTime":MOCK_INFO_0_START_TIME, "endTime":MOCK_INFO_0_END_TIME, "diffTime":MOCK_INFO_0_DIFF_TIME },
							{"startTime":MOCK_INFO_1_START_TIME, "endTime":MOCK_INFO_1_END_TIME, "diffTime":MOCK_INFO_1_DIFF_TIME },
							{"startTime":MOCK_INFO_2_START_TIME, "endTime":MOCK_INFO_2_END_TIME, "diffTime":MOCK_INFO_2_DIFF_TIME }
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
//		TimeLogPaneCtrler.loadTimeLogs();
//		expect( TimeLogPaneCtrler.timeLogInfos[0].startTime ).toEqual( MOCK_INFO_0_START_TIME           );
//		expect( TimeLogPaneCtrler.timeLogInfos[1].endTime   ).toEqual( MOCK_INFO_1_END_TIME );
//		expect( TimeLogPaneCtrler.timeLogInfos[2].diffTime  ).toEqual( MOCK_INFO_2_DIFF_TIME          );
	});

});

