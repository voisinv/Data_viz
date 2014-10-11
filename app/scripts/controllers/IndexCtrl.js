function IndexCtrl (DataValues) {
    vm = this;
    vm.tags = DataValues.getTags();
    vm.tag = {
        tagName: '',
        url: ''
    };

    vm.addTag = function() {
        DataValues.addTag(vm.tag);
    };
}

angular.module('controllers')
	.controller('IndexCtrl', IndexCtrl);
