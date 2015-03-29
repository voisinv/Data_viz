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
        $modal
        .open({
             templateUrl: '../../modal.html',
             controller: 'ModalCtrl as ctrl',
             size: 'lg',
             resolve : { }
        })
        .result
        .then(
            function(result) {
                vm.tags = DataFctr.nodes;
                console.log('result',  vm.datas)
                //vm.datas.nodes.push(result)
                $rootScope.$broadcast('newUrl', result)
            }
        );
    }


};

function ModalCtrl($scope, $modalInstance, DataFctr) {
    // On récupère la liste et on ajoute une propriété pour la sélection des "liés à"
    this.datas = _.each( DataFctr.nodes, function ( e ){ e.selected = false ; });

    this.add = function(name) {
        var result =
        DataFctr.add(
            name,
            0,
           this.datas.filter(function(e){return e.selected}),
           null
        );
        $modalInstance.close(result);
    }

    this.cancel = function() {
        $modalInstance.dismiss() ;
    }

};


angular
    .module('controllers')
	.controller('MainCtrl', ctrl)
	.controller('ModalCtrl', ModalCtrl);


