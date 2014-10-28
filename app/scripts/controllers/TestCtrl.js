function ctrl($rootScope) {
    var vm = this;

    vm.nameTagHovered = '';

    $rootScope.$on('hoverTag', function(e, arg) {
        console.log(arg.id);
        vm.nameTagHovered = arg.id;
    });
}

angular
    .module('controllers')
	.controller('TestCtrl', ctrl);