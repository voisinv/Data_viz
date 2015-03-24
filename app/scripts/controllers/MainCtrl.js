function ctrl($scope, articlesSrv, linksSrv) {
    var vm = this;

    vm.tagHovered = {};
    vm.article = { title: '', url: '', tags: ''};
    vm.erreurSaisieTag = false;
    vm.modeByArticles = true;

    vm.tagsByArticles = articlesSrv.getArticles();
    vm.articlesByTags = articlesSrv.getArticlesByTags();
    vm.links = linksSrv.getLinks();

    $scope.$on('hoverTag', function(event, tag) {
        vm.tagHovered = tag;
        $scope.$apply();
    });

    vm.addArticle = function() {
        if(vm.article.tags !== '' && vm.article.url !== '' && vm.article.title !== '') {
            vm.article.tags = vm.article.tags.split(' ');
            vm.article.tags = deleteDoubleTags(vm.article.tags);

            articlesSrv.addArticle(vm.article);

            vm.article = { title: '', url: '', tags: ''};
        } else {
            vm.erreurSaisieTag = true;
        }
        vm.articlesByTags = articlesSrv.getArticlesByTags();
    };
    vm.switchModeByArticles = function() {
        vm.modeByArticles = !vm.modeByArticles;
    };
    vm.getArticleTitle = function(articleId) {
        var article = articlesSrv.getArticleById(articleId);
        return article.title;
    };
    vm.test = function() {
        console.log('test');
    };

    var deleteDoubleTags = function(tagsTab) {
        var currTag = tagsTab[0];
        for(var i=1; i<tagsTab.length; i++) {
            var secTag = tagsTab[i];
            if(currTag === secTag) {
                tagsTab.splice(0, 1);
                deleteDoubleTags(tagsTab);
            }
        }
        return tagsTab;
    };
}

angular
    .module('controllers')
	.controller('MainCtrl', ctrl);