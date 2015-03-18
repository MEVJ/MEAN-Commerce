angular.module('Mean-Commerce').config(function ($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {

	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('main', {
		url: '/',
		templateUrl: '/views/main.html'
	})

	.state('register', {
		url: '/register',
		templateUrl: '/views/register.html',
		controller: 'RegisterCtrl'
	})

	.state('login', {
		url: '/login',
		templateUrl: '/views/login.html',
		controller: 'LoginCtrl'
	})

	.state('cart', {
		url: '/cart',
		templateUrl: '/views/cart.html',
		controller: 'cartCtrl'
	})

	.state('logout', {
		url: '/logout',
		controller: 'LogoutCtrl'
	});

	$authProvider.loginUrl = API_URL + 'auth/login';
	$authProvider.signupUrl = API_URL + 'auth/register';

	$authProvider.google({
		clientId: 'Your client ID',
		url: API_URL + 'auth/google'
	})

	$authProvider.facebook({
		clientId: 'Your client ID',
		url: API_URL + 'auth/facebook'
	})

	$httpProvider.interceptors.push('authInterceptor');
})

.constant('API_URL', 'http://localhost:3000/')

.run(function ($window) {
	var params = $window.location.search.substring(1);

	if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
		var pair = params.split('=');
		var code = decodeURIComponent(pair[1]);

		$window.opener.postMessage(code, $window.location.origin);
	}
});
