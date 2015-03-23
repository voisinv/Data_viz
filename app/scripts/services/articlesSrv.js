function articlesSrv () {
    var articlesSrv = {
        articles: [
            {
                id: 0,
                title: 'title0',
                url: 'title0.fr',
                tags: ['1', '2', '3']
            },
            {
                id: 1,
                title: 'title1',
                url: 'title1.fr',
                tags: ['1', '4', '5']
            },
            {
                id: 2,
                title: 'title2',
                url: 'title2.fr',
                tags: ['6']
            },
            {
                id: 3,
                title: 'title3',
                url: 'title3.fr',
                tags: ['3', '2', '1', '7']
            },
            {
                id: 4,
                title: 'title4',
                url: 'title4.fr',
                tags: ['8', '4']
            },
            {
                id: 5,
                title: 'title5',
                url: 'title5.fr',
                tags: ['1', '2', '3', '4', '5', '6', '7', '8']
            }
        ]
    };

    articlesSrv.getArticles = function() {
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
        articlesSrv.articles.push({
            id: 0,
            title: article.title,
            url: article.url,
            tags: article.tags
        });
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
    articlesSrv.getTagLinksTab = function() {
        return {
            tags: [
                {
                    value: '1',
                    articleIds: [0, 1, 3, 5]
                },
                {
                    value: '2',
                    articleIds: [0, 3, 5]
                },
                {
                    value: '3',
                    articleIds: [0, 3, 5]
                },
                {
                    value: '4',
                    articleIds: [1, 4, 5]
                },
                {
                    value: '5',
                    articleIds: [1, 5]
                },
                {
                    value: '6',
                    articleIds: [2, 5]
                },
                {
                    value: '7',
                    articleIds: [3, 5]
                },
                {
                    value: '8',
                    articleIds: [4, 5]
                }
            ]
        };
    };

    return articlesSrv;
}

angular
    .module('services')
    .factory('articlesSrv', articlesSrv);