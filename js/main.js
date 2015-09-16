(function() {
	var app = angular.module("popupApp", ["components"]);

	app.controller("TestClickCtrl", function() {
		this.click = function() {
			alert("Clicked!");
		};
	});
})();


