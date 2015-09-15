(function() {
	var app = angular.module("popupApp", []);

	app.controller("TestClickCtrl", function() {
		this.click = function() {
			alert("Clicked!");
		};
	});
})();
