function ctrl($scope, $rootScope, collection) {
    var vm = this;

    vm.tagHovered = {};
    vm.tag = { id: '', url: '' };
    vm.erreurSaisieTag = false;
    vm.tags = collection.get();

    $scope.$on('hoverTag', function(event, tag) {
        vm.tagHovered = tag;
        $scope.$apply();
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
	.controller('MainCtrl', ctrl);