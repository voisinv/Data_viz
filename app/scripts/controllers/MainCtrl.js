function ctrl($scope, articleSrv) {
    var vm = this;

    vm.tagHovered = {};
    vm.article = { title: '', url: '', tags: ''};
    vm.erreurSaisieTag = false;
    vm.articles = articleSrv.getArticles();

    $scope.$on('hoverTag', function(event, tag) {
        vm.tagHovered = tag;
        $scope.$apply();
    });

    vm.addArticle = function() {
        if(vm.article.tags !== '' && vm.article.url !== '' && vm.article.title !== '') {
            vm.article.tags = vm.article.tags.split(' ');
            vm.article.tags = vm.deleteDoubleTags(vm.article.tags);
            articleSrv.addArticle(vm.article);
            vm.article = { title: '', url: '', tags: ''};
        } else {
            vm.erreurSaisieTag = true;
        }
    };
    vm.deleteDoubleTags = function(tagsTab) {
        var currTag = tagsTab[0];
        for(var i=1; i<tagsTab.length; i++) {
            var secTag = tagsTab[i];
            if(currTag === secTag) {
                tagsTab.splice(0, 1);
                vm.deleteDoubleTags(tagsTab);
            }
        }
        return tagsTab;
    };
}

angular
    .module('controllers')
	.controller('MainCtrl', ctrl);