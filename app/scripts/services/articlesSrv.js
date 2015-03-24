function articlesSrv ($filter, linksSrv) {
    var articlesSrv = {
        articles: [
            {
                id: 0,
                title: 'title0',
                url: 'title0.fr',
                tags: ['1', '2', '3']
            },{
                id: 1,
                title: 'title1',
                url: 'title1.fr',
                tags: ['1', '4']
            },{
                id: 2,
                title: 'title2',
                url: 'title2.fr',
                tags: ['3']
            },{
                id: 3,
                title: 'title3',
                url: 'title3.fr',
                tags: ['1', '2', '3']
            },{
                id: 4,
                title: 'title4',
                url: 'title4.fr',
                tags: ['2', '4']
            },{
                id: 5,
                title: 'title5',
                url: 'title5.fr',
                tags: ['1', '2', '4']
            }
        ],
        tags: []
    };

    // Articles methods
    articlesSrv.getArticles = function() {
        //promise - success : maj id articles + maj tags
        updateTags();
        return articlesSrv.articles;
    };
    articlesSrv.getArticle = function(articleId) {
        articlesSrv.articles.forEach(function(element){
            if(element.id === articleId) return element;
        });
        return -1;
    };
    articlesSrv.addArticle = function(article) {
        var existingTag = false;
        articlesSrv.articles.forEach(function(element){
            if(element.title === article.title || element.url === article.url) {
                existingTag = true;
            }
        });
        if(existingTag) {
            return -1;
        }
        var newArticle = {
            id: articlesSrv.articles.length,
            title: article.title,
            url: article.url,
            tags: $filter('orderBy')(article.tags)
        };
        //promise - success : maj id nouvel article
        articlesSrv.articles.push(newArticle);
        updateTags();

        linksSrv.addLinksBetweenTags(newArticle);
        return article;
    };
    articlesSrv.deleteArticle = function(articleId) {
        articlesSrv.articles.forEach(function(element, index){
            if(element.id === articleId) {
                articlesSrv.articles.splice(index, 1);
                return articleId;
            }
        });
        return -1;
    };

    // Tags methods
    articlesSrv.getTags = function() {
        var tags = [];
        articlesSrv.articles.forEach(function(articleTag) {
            articleTag.tags.forEach(function(tag) {
                if(!_.contains(tags, tag)) {
                    tags.push(tag);
                }
            });
        });
        return tags;
    };
    articlesSrv.getArticlesIdByTag = function(tag) {
        var articlesByTag = {
            value: tag,
            articleIds: []
        };
        articlesSrv.articles.forEach(function(article) {
            if(_.contains(article.tags, tag)) {
                articlesByTag.articleIds.push(article.id);
            }
        });
        return articlesByTag;
    };
    articlesSrv.getArticlesByTags = function() {
        return articlesSrv.tags;
    };
    var updateTags = function() {
        articlesSrv.tags = [];
        var tags = articlesSrv.getTags();
        tags.forEach(function(element) {
            articlesSrv.tags.push(articlesSrv.getArticlesIdByTag(element));
        });
        //articlesSrv.tags = $filter('orderBy')(articlesSrv.tags, 'value');
    };

    //Links methods
    articlesSrv.getLinksBetweenTags = function() {
        articlesSrv.tags.forEach(function(element) {

        });
    };

    return articlesSrv;
}

angular
    .module('services')
    .factory('articlesSrv', articlesSrv);