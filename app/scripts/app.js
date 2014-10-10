angular.module('controllers', ['ui.bootstrap'])
angular.module('directives', [])
angular.module('services', [])
angular.module('ngApp',
	[
	'ui-bootstrap',
	'controllers',
	'directives',
	'services',
	])
	.config(function($stateProvider, $urlRouterProvider){
		
	})