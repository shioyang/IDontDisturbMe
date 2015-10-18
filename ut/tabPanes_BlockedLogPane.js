describe('tab-panes BlockedLogPaneCtrler', function() {
	var $rootScope;
	var $controller;
	beforeEach(module('popupApp'));
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		$rootScope = _$rootScope_;
		$controller = _$controller_;
	}));

	var MOCK_INFO_0_URL = "http://google.com/";
	var MOCK_INFO_1_URL = "http://youtube.com/";
	var MOCK_INFO_2_URL = "http://example.com/";
	var MOCK_INFO_0_FORMATTED_URL = "*://google.com/*";
	var MOCK_INFO_1_FORMATTED_URL = "*://youtube.com/*";
	var MOCK_INFO_2_FORMATTED_URL = "*://example.com/*";
	var MOCK_INFO_0_TIME = "2015-10-15 02:33:44";
	var MOCK_INFO_1_TIME = "2015-11-19 05:30:14";
	var MOCK_INFO_2_TIME = "2015-12-25 19:13:24";

	function StoreItemFactoryMock() {
		return {
			loadItem: function(keys, stores, default_value, scope, that, callback) {
				// Use "$apply" because angular doesn't know this turn.
				scope.$apply(function() {
					var items = {
						"key_blockedLog": [
							{"url":MOCK_INFO_0_URL, "formattedUrl":MOCK_INFO_0_FORMATTED_URL, "time":MOCK_INFO_0_TIME },
							{"url":MOCK_INFO_1_URL, "formattedUrl":MOCK_INFO_1_FORMATTED_URL, "time":MOCK_INFO_1_TIME },
							{"url":MOCK_INFO_2_URL, "formattedUrl":MOCK_INFO_2_FORMATTED_URL, "time":MOCK_INFO_2_TIME }
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
		expect( BlockedLogPaneCtrler.blockedLogInfos[0].url          ).toEqual( MOCK_INFO_0_URL           );
		expect( BlockedLogPaneCtrler.blockedLogInfos[1].formattedUrl ).toEqual( MOCK_INFO_1_FORMATTED_URL );
		expect( BlockedLogPaneCtrler.blockedLogInfos[2].time         ).toEqual( MOCK_INFO_2_TIME          );
	});

});

