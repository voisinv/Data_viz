function IndexCtrl (DataValues) {
    vm = this;
    vm.tags = DataValues.getTags();

    vm.addTag = function(name, url) {
        var tag = {'tagName': name, 'url': url};
        DataValues.addTag(tag);
    };
}

angular.module('controllers')
	.controller('IndexCtrl', IndexCtrl);
