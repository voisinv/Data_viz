function ctrl($scope, $rootScope, collection) {
    var vm = this;

    vm.idTagHovered = 'tag hovered';
    vm.tag = { id: '', url: '' };
    vm.erreurSaisieTag = false;
    vm.tags = collection.get();

    $scope.$on('hoverTag', function(event, tagId) {
        console.log(tagId);
        vm.idTagHovered = tagId;
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
	.controller('TestCtrl', ctrl);