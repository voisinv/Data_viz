'use strict';

angular.module('controllers', []);
angular.module('directives', []);
angular.module('services', []);

angular
    .module('app', ['firebase', 'ngMaterial','ngAria', 'ui.bootstrap', 'ui.router', 'services', 'directives', 'controllers'])
	.config(function($stateProvider, $urlRouterProvider) {

	    $urlRouterProvider.otherwise("/main");

        $stateProvider
            .state('main', {
                url: "/main",
                templateUrl: "../views/main.html"
            })
            .state('details', {
                url: '/details',
                templateUrl: '../views/details.html'
            })
        ;
	})
    .controller('IndexCtrl', function($rootScope, articlesSrv) {
        var self = this;
        self.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();

        };
        self.debug = false;
        self.change = function() {
            //self.debug=!self.debug;
        }
    })
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .backgroundPalette('grey')
            .warnPalette('red')
            .accentPalette('pink');
    });