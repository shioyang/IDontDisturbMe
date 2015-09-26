angular.module('util-services', [])

	.factory('StoreItemFactory', function() {
		return {
			/*
			 * loadItem
			 */
			loadItem: function(keys, stores, default_value, scope, that, callback) {
				chrome.storage.sync.get(keys, function(items) {
					// Use "$apply" because angular doesn't know this turn.
					scope.$apply(function() {
						console.log("===");
						console.log("Loaded:");
						console.log("keys");
						console.log(keys);
						console.log("items");
						console.log(items);
						angular.forEach(items, function(item, key) {
							var store = stores[keys.indexOf(key)];
							that[store] =  (item != null) ? angular.fromJson(item) : default_value;
							console.log("store");
							console.log(store);
							console.log(that[store]);
						});
						console.log("===");
						if (callback)
							callback();
					});
				});
			},

			/*
			 * saveItem
			 */
			saveItem: function(keys, stringValues) {
				var object = {};
				angular.forEach(keys, function(key) {
					var value = stringValues[keys.indexOf(key)];
					object[key] = value;
				});
				chrome.storage.sync.set(object, function() {
					console.log("===");
					console.log("saved:");
					console.log(object);
					console.log("===");
				});
			}
		};
	});

