function MainCtrl($scope, $rootScope, articlesSrv, linksSrv) {
    var vm = this;
    vm.tab = angular.copy(['Apple', 'Banana', 'Orange']);
    vm.tagHovered = {};
    vm.value = '';
    vm.article = { title: '', url: '', tags: ''};
    vm.erreurSaisie = false;
    vm.modeByArticles = true;
    vm.viewState = true;

    vm.articles = articlesSrv.getArticles(); // article = {id, tags, title, url}
    vm.tags = articlesSrv.getTags(); // tag = {articleIds, value}
    vm.links = linksSrv.getLinks();

    $scope.$on('hoverTag', function(event, tagValue) {
        vm.tagHovered = articlesSrv.getTagByValue(tagValue);
        $scope.$apply();
    });

    vm.hoverTag = function(tag) {
        vm.value = tag.value;
    };

    vm.getArticleById = function(articleId) {
        return articlesSrv.getArticleById(articleId);
    };
    vm.addArticle = function() {
        if(vm.article.tags !== '' && vm.article.url !== '' && vm.article.title !== '') {
            var a = articlesSrv.isExistingArticle(vm.article);
            if(a === 'title') {
                vm.erreurSaisie = true;
                vm.msgErreur = 'Titre d\'article déjà existant';
            } else if(a === 'url') {
                vm.erreurSaisie = true;
                vm.msgErreur = 'Url d\'article déjà existante';
            } else {
                vm.article.tags = vm.article.tags.split(' ');
                vm.article.tags = deleteDoubleTags(vm.article.tags);

                articlesSrv.addArticle(vm.article);
                vm.tags = articlesSrv.getTags();
                vm.links = linksSrv.getLinks();

                $rootScope.$broadcast('newUrl');

                vm.article = { title: '', url: '', tags: ''};
            }
        } else {
            vm.erreurSaisie = true;
            vm.msgErreur = 'Remplir tous les champs';
        }
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
    vm.changeViewState = function() {
        vm.viewState = !vm.viewState;
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
	.controller('MainCtrl', MainCtrl);