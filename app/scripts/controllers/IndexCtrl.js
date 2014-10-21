/*
function IndexCtrl ($scope, DataValues) {
    vm = this;
    vm.tags = DataValues.getTags();
    vm.newTag = {
        tagName: '',
        url: ''
    };
    vm.isTagSelected = false;
    vm.tagSelected = {};

    vm.addTag = function() {
        DataValues.addTag(vm.newTag);
        vm.tags = DataValues.getTags();
    };

    vm.clickOnTag = function(tagName, urls) {
        vm.isTagSelected = true;
        vm.tagSelected = {tagName: tagName, urls: urls};
        $scope.$digest();
    };
}

*/
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
        // si le tag existe
        if( collection.exist(vm.tag.name) ) {
            // On laisse le modèle déterminer si l'url existe avant de l'ajouter
            collection.url(vm.tag);
            $rootScope.$broadcast('resize',  _.findWhere(collection.get(), {name:vm.tag.name}));
        } else {
            // On ajoute le tag
            collection.add(vm.tag);
        }
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