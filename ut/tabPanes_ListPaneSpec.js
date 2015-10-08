describe('tab-panes ListPaneCtrler', function() {
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
						key_urlInfos: [
								{"url":"http://www.youtube.com/","blocked":0},
								{"url":"http://news.google.co.jp/","blocked":0}
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

	it('should load URL info.', function() {
		var listPaneCtrler = $controller('ListPaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
		listPaneCtrler.loadUrls();
		expect( listPaneCtrler.urlInfos[0].url ).toEqual("http://www.youtube.com/");
		expect( listPaneCtrler.urlInfos[1].blocked ).toEqual(0);
	});

//	it('should save URL info.', function() {
//	});

	it('should add a new URL info.', function() {
		var listPaneCtrler = $controller('ListPaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
		var testUrl = "http://www.new.url/";
		listPaneCtrler.addedUrl = testUrl;
		listPaneCtrler.addUrl();
		expect( listPaneCtrler.urlInfos[listPaneCtrler.urlInfos.length - 1].url ).toEqual(testUrl);
		expect( listPaneCtrler.urlInfos[listPaneCtrler.urlInfos.length - 1].blocked ).toEqual(0);
	});

	it('should set a URL as selected.', function() {
		var ctrl = $controller('ListPaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
		var testUrl = ctrl.urlInfos[0];
		ctrl.setSelected(testUrl);
		expect( ctrl.selectedUrl ).toEqual(testUrl);
	});

	it('should remove a selected URL.', function() {
		var ctrl = $controller('ListPaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
		var testUrl = ctrl.urlInfos[0];
		ctrl.setSelected(testUrl);
		ctrl.removeSelectedUrl();
		angular.forEach(ctrl.urlInfos, function(urlInfo) {
			expect( urlInfo.url ).not.toEqual(testUrl);
		});
	});

});

