'use strict';

angular.module('controllers', []);
angular.module('directives', []);
angular.module('services', []);

angular
    .module('app', ['ngRoute', 'services', 'directives', 'controllers'])
	.config(function($routeProvider){
		$routeProvider
		    .when('/main', {
		        templateUrl: '../../app/views/main.html'
		    })
		    .otherwise({
                redirectTo: '/'
            });
	});

angular
    .module('app')
    .directive('testD3', function(){
        return{
            restrict: 'EA',
            link: {
            }
        }
    });