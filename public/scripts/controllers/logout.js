'use strict';

angular.module('Mean-Commerce')
	.controller('LogoutCtrl', function ($auth, $state) {
		$auth.logout();
		$state.go('main');
	});
