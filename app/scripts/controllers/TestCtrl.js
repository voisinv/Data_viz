function ctrl($rootScope) {
    var vm = this;

    vm.nameTagHovered = '';

    $rootScope.$on('hoverTag', function(e, arg) {
        console.log(arg.name);
        vm.nameTagHovered = arg.name;
    });
}

angular
    .module('controllers')
	.controller('TestCtrl', ctrl);