'use strict';

angular.module('Mean-Commerce')
	.controller('CartCtrl', function ($scope, $http, API_URL, alert) {

		$http.get('http://localhost:3000/content.json').success(function (cart) {
			$scope.cart = cart;
			console.log('getting the cart value '+ cart);
		}).error(function (err) {
			alert('warning', "Unable to get cart", err.message);
		})
	});
