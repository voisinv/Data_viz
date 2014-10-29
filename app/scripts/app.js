'use strict';

angular.module('controllers', []);
angular.module('directives', []);
angular.module('services', []);

angular
    .module('app', ['ui.router', 'services', 'directives', 'controllers'])
	.config(function($stateProvider, $urlRouterProvider) {

	    $urlRouterProvider.otherwise("/main");

        $stateProvider
            .state('main', {
                url: "/main",
                templateUrl: "../views/main.html"
            });
	});