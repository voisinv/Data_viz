function IndexCtrl (DataValues, $scope) {
    vm = this;
    vm.tags = DataValues.getTags();
    vm.newTag = {
        tagName: '',
        url: ''
    };
    vm.isTagSelected = false;
    vm.tagSelected = {};

    $scope.$watch('isTagSelected', function(newValue) { console.log(newValue); });

    vm.addTag = function() {
        DataValues.addTag(vm.newTag);
    };

    vm.clickOnTag = function(tagName, urls) {
        angular.element('#container-dataviz-view').toggleClass('col-sm-12').toggleClass('col-sm-9');
        vm.isTagSelected = !vm.isTagSelected;
        angular.element('#container-tag-list').toggleClass('col-sm-3');
        vm.tagSelected = {tagName: tagName, urls: urls};
    };
}

angular.module('controllers')
	.controller('IndexCtrl', IndexCtrl);
