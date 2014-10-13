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

angular.module('controllers')
	.controller('IndexCtrl', IndexCtrl);
