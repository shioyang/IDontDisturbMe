angular.module('util-services', [])

	.factory('StoreItemFactory', function() {
		return {
			loadItem: function(keys, stores, default_value, scope, that) {
				chrome.storage.sync.get(keys, function(items) {
					// Use "$apply" because angular doesn't know this turn.
					scope.$apply(function() {
						console.log("loaded: keys");
						console.log(keys);
						console.log("        items");
						console.log(items);
						angular.forEach(items, function(item, key) {
							var store = stores[keys.indexOf(key)];
							that[store] =  (item != null) ? angular.fromJson(item) : default_value;
							console.log("        store");
							console.log(store);
							console.log(that[store]);
						});
					});
				});
			}
		};
	});

