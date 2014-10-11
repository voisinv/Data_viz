function IndexCtrl (DataValues) {
    vm = this;
    vm.tags = [];

    vm.getTags = function() {
        vm.tags = DataValues.getData();
    };
}

angular.module('controllers')
	.controller('IndexCtrl', IndexCtrl);
