'use strict';

angular.module('Mean-Commerce')
	.controller('HeaderCtrl', function ($scope, $auth) {
		$scope.isAuthenticated = $auth.isAuthenticated;
	});
