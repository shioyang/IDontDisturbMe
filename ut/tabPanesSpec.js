describe('tab-panes', function() {
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
//					console.log("===");
//					console.log("Loaded:");
//					console.log("keys");
//					console.log(keys);
//					console.log("items");
//					console.log(items);
					angular.forEach(items, function(item, key) {
						var store = stores[keys.indexOf(key)];
						that[store] =  (item != null) ? angular.fromJson(item) : default_value;
//						console.log("store");
//						console.log(store);
//						console.log(that[store]);
					});
//					console.log("===");
					if (callback)
						callback();
				});
			},

			/*
			 * saveItem
			 */
			saveItem: function(keys, stringValues) {
//				console.log("===");
//				console.log("saved");
//				console.log("keys:");
//				console.log(keys);
//				console.log("stringValues:");
//				console.log(stringValues);
//				console.log("===");
			}
		};
	};

	it('controller', function() {
		var listPaneCtrler = $controller('ListPaneCtrler', { $scope: $rootScope, StoreItemFactory: StoreItemFactoryMock() });
		listPaneCtrler.loadUrls();
		expect( listPaneCtrler.urlInfos[0].url ).toEqual("http://www.youtube.com/");
		expect( listPaneCtrler.urlInfos[1].blocked ).toEqual(0);
	});

});

describe('Hello Directive', function() {
	var $compile;
	var $rootScope;
	beforeEach(module('popupApp'));
	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('Compile tabs directive', function() {
		var element = $compile("<tabs></tabs>")($rootScope);
//		$rootScope.$digest();
//		expect(element.html()).toContain("...");
	});
});
