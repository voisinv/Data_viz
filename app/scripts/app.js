'use strict';

angular.module('controllers', []);
angular.module('directives', []);
angular.module('services', []);

angular
    .module('app', ['ngMaterial','ngAria', 'ui.bootstrap', 'ui.router', 'services', 'directives', 'controllers'])
	.config(function($stateProvider, $urlRouterProvider) {

	    $urlRouterProvider.otherwise("/main");

        $stateProvider
            .state('main', {
                url: "/main",
                templateUrl: "../views/main.html"
            });
	})
    .controller('AppCtrl', function() {
        var self = this;
        self.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };
    })
.config( function( $mdIconProvider ){
        $mdIconProvider.iconSet("avatar", './img/avatar-icons.svg', 128);
    })