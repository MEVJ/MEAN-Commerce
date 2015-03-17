'use strict';

angular.module('Mean-Commerce')
	.controller('CartCtrl', function ($scope, $http, API_URL, alert) {

		$http.get('http://localhost:1337/cart').success(function (cart) {
			$scope.cart = cart;
		}).error(function (err) {
			alert('warning', "Unable to get cart", err.message);
		})
	});
