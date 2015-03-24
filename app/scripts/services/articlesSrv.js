function articlesSrv ($filter, linksSrv) {
    var articlesSrv = {
        articles: [
            {
                id: 0,
                title: 'article0',
                url: 'article0.fr',
                tags: ['tag1', 'tag2', 'tag3']
            },{
                id: 1,
                title: 'article1',
                url: 'article1.fr',
                tags: ['tag1', 'tag4']
            },{
                id: 2,
                title: 'article2',
                url: 'article2.fr',
                tags: ['tag3']
            },{
                id: 3,
                title: 'article3',
                url: 'article3.fr',
                tags: ['tag1', 'tag2', 'tag3']
            },{
                id: 4,
                title: 'article4',
                url: 'article4.fr',
                tags: ['tag2', 'tag4']
            },{
                id: 5,
                title: 'article5',
                url: 'article5.fr',
                tags: ['tag1', 'tag2', 'tag4']
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
    articlesSrv.getArticleById = function(articleId) {
        var article = null;
        articlesSrv.articles.forEach(function(element){
            if(element.id === articleId) {
                article = element;
            }
        });
        return article;
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