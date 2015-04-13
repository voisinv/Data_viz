function MainCtrl($scope, $rootScope, $state, articlesSrv, linksSrv, dbconnection, $timeout) {
    var vm = this;
    _.extend(vm,
        {
            tagHovered: {},
            value: '',
            article: { title: '', url: '', tags: ''},
            erreurSaisie: true,
            modeByarticles: true,
            viewState: true,
            articles: articlesSrv.getArticles(),
            tags: articlesSrv.getTags(),
            displayname: true,
            links: linksSrv.getLinks(),
            linkdistance: 10,
            gravity: 3,
            charge: 500
        }
    )


    vm.hoverTag = function(tag) {
        vm.tagHovered = tag;
        $scope.$apply();
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
                vm.article.tags = _.uniq(_.words(vm.article.tags,  /[^, ]+/g));
                vm.article.tags = deleteDoubleTags(vm.article.tags);

                articlesSrv.addArticle(vm.article);
                vm.tags = articlesSrv.getTags();
                vm.links = linksSrv.getLinks();
                console.log('links', vm.links)
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

        $rootScope.$broadcast('displayText', {toDisplay: vm.displayname = !vm.displayname});
    };
    vm.changeViewState = function() {
        $state.go('details')
    };

    vm.update = function(){
            $rootScope.$broadcast('newUrl');
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

    vm.connect = function() {
        dbconnection.connect().then(function() {
            vm.articles= articlesSrv.getArticles();
            vm.tags= articlesSrv.getTags();
            vm.links= linksSrv.getLinks();
            $rootScope.$broadcast('dbconnection');
        });
    }
    vm.save = function() {
        $rootScope.$broadcast('stopForce')
        dbconnection.save(vm.articles, vm.tags, vm.links).then(
            function(){console.log('success')}
        )
    }
    vm.restore = function() {

        dbconnection.restore();
    }


}

angular
    .module('controllers')
	.controller('MainCtrl', MainCtrl);