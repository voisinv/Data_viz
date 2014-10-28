function ctrl($rootScope, collection) {
    var vm = this;

    vm.nameTagHovered = '';
    vm.tag = { id: '', url: '' };
    vm.erreurSaisieTag = false;
    vm.tags = collection.get();

    $rootScope.$on('hoverTag', function(e, arg) {
        console.log(arg.id);
        vm.nameTagHovered = arg.id;
    });


    vm.addTag = function() {
        if(vm.tag.id !== '' && vm.tag.url !== '')
            collection.addTag(vm.tag);
        else
            vm.erreurSaisieTag = true;
    }
}

angular
    .module('controllers')
	.controller('TestCtrl', ctrl);