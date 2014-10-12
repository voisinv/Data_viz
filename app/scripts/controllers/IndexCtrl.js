function IndexCtrl (DataValues) {
    vm = this;
    vm.tags = DataValues.getTags();
    vm.tag = {
        tagName: '',
        url: ''
    };
    vm.tagClicked = false;

    vm.addTag = function() {
        DataValues.addTag(vm.tag);
    };

    vm.clickOnTag = function(tag) {
        angular.element('#container-dataviz-view').toggleClass('col-sm-12').toggleClass('col-sm-9');
        angular.element('#container-tag-list').toggleClass('col-sm-3');
        vm.tagClicked = true;
    };
}

angular.module('controllers')
	.controller('IndexCtrl', IndexCtrl);
