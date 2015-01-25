function ctrl($scope, $rootScope, collection, $modal, DataFctr) {
    var vm = this;

    vm.tagHovered = {};
    vm.tag = { id: '', url: '' };
    vm.erreurSaisieTag = false;
    vm.tags = DataFctr.nodes;


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

    vm.datas = DataFctr;
    vm.open = function(){
        $modal.open({
             templateUrl: '../../modal.html',
             size: 'lg',
             resolve : {
                datas : vm.datas
             }
        })
    };
};

function ModalCtrl($scope, DataFctr) {
console.log('data for my modal', DataFctr)
    var relations = [];
    this.datas = DataFctr.nodes;
    this.url = function(index) {
        relations.push(index);
    }
}


angular
    .module('controllers')
	.controller('MainCtrl', ctrl)
	.controller('modalCtrl', ModalCtrl);


