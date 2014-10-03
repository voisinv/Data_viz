angular.module('controllers', [])
angular.module('directives', [])
angular.module('services', [])
angular.module('ngApp',
	[
	'angular-ui',
	'controllers',
	'directives',
	'services',
	])
	.config(function($stateProvider, $urlRouterProvider){
		
	})