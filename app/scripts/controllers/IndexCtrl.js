function ctrl($scope, collection, $rootScope) {
    var vm = this;

    vm.tags = collection.get();

    vm.tag = {
        name : '',
        url : ''
    };

    vm.tagSelected = false;
    vm.tagSelected = {};

    vm.addTag = function() {
        collection.add(vm.tag);
        $rootScope.$broadcast('resize', collection.get());
    }

    vm.clickOnTag = function(name, urls) {
        vm.isTagSelected = true;
        vm.tagSelected = {name:name, urls:urls};
        $scope.$digest();
    }
}
angular.module('controllers')
	.controller('IndexCtrl', ctrl)
//TODO $parser for the input