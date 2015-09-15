var popupApp = angular.module("popupApp", []);

popupApp.controller("TestClickCtrl", function($scope) {
	$scope.click = function() {
		alert("Clicked!");
	};
});
