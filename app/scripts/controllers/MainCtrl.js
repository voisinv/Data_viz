function ctrl($scope, $rootScope, collection, $modal) {
    var vm = this;

    vm.tagHovered = {};
    vm.tag = { id: '', url: '' };
    vm.erreurSaisieTag = false;
    vm.tags = collection.get();

    this.hoverTag = function(tag) {
            vm.tagHovered = tag;
            $scope.$apply();
        };


    vm.addTag = function() {
        if(vm.tag.id !== '' && vm.tag.url !== '')
            collection.addTag(vm.tag);
        else
            vm.erreurSaisieTag = true;
    }
    vm.open = function(){
        $modal.open({
             templateUrl: '../../modal.html',
             size: 'lg'
        })
    }
}


angular
    .module('controllers')
	.controller('MainCtrl', ctrl)
	.controller('modalCtrl', function($scope, collection){
        this.collections = collection.get();
        this.url = function(index) {
            console.log(index)
        }
	});