'use strict';

angular.module('controllers', []);
angular.module('directives', []);
angular.module('services', []);

angular
    .module('app', ['ngRoute', 'services', 'directives', 'controllers'])
	.config(function($routeProvider){
		$routeProvider
		    .when('/', {
		        templateUrl: 'views/main.html'
		    })
		    .otherwise({
                redirectTo: '/'
            });
	});
