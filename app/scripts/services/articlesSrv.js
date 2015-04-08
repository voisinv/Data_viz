function articlesSrv ($filter, $firebaseObject, linksSrv) {
    var articlesSrv = {
        articles:[],
        tags: []
    }/*
        "articles": [
            {
                "id": 0,
                "title": "article0",
                "url": "article0.fr",
                "tags": ["tag1", "tag2", "tag3"]
            },{
                "id": 1,
                "title": "article1",
                "url": "article1.fr",
                "tags": ["tag1", "tag4"]
            },{
                "id": 2,
                "title": "article2",
                "url": "article2.fr",
                "tags": ["tag3"]
            },{
                "id": 3,
                "title": "article3",
                "url": "article3.fr",
                "tags": ["tag1", "tag2", "tag3"]
            },{
                "id": 4,
                "title": "article4",
                "url": "article4.fr",
                "tags": ["tag2", "tag4"]
            },{
                "id": 5,
                "title": "article5",
                "url": "article5.fr",
                "tags": ["tag1", "tag2", "tag4"]
            }
        ],
        "tags": [
            {
                "id": 0,
                "value": "",
                "articleIds": [],
                "radius": 1,
                "fixed": true,
                "x": -1,
                "y": -1
            },{
                "id": 1,
                "value": "tag1",
                "articleIds": [0, 1, 3, 5],
                "radius": 20
            },
            {
                "id": 2,
                "value": "tag2",
                "articleIds": [0, 3, 4, 5],
                "radius": 20
            },
            {
                "id": 3,
                "value": "tag3",
                "articleIds": [0, 2, 3],
                "radius": 15
            },
            {
                "id": 4,
                "value": "tag4",
                "articleIds": [1, 4, 5],
                "radius": 15
            }
        ]
    };
*/
    // Articles methods
    articlesSrv.getArticles = function() {
        //promise - success : maj id articles
        return articlesSrv.articles;
    };
    articlesSrv.getArticleById = function(articleId) {
        return _.findWhere(articlesSrv.articles, {id: articleId});
    };
    articlesSrv.addArticle = function(article) {
        var newArticle = {
            "id": articlesSrv.articles.length,
            "title": article.title,
            "url": article.url,
            "tags": $filter("orderBy")(article.tags)
        };

        //promise - success : maj id nouvel article
        articlesSrv.articles.push(newArticle);

        //Gestion tags
        updateTags(newArticle); // need success promise (pr l"id de l"article)

        linksSrv.addLinksBetweenTags(newArticle, articlesSrv.tags);
        return newArticle;
    };
    var updateTags = function(newArticle) {
        newArticle.tags.forEach(function(tag) {
            var o = _.find(articlesSrv.tags, {value: tag});
            if(o !== undefined) {
                o.articleIds.push(newArticle.id);
                o.radius += 5;
            } else {
                articlesSrv.tags.push({"id": articlesSrv.tags.length,value: tag, articleIds: [newArticle.id], radius: 5});
            }
        });
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
    articlesSrv.isExistingArticle = function(article) {
        var existingArticle = false;
        articlesSrv.articles.forEach(function(element){
            if(element.title === article.title) {
                existingArticle = "title";
            }
            if(element.url === article.url) {
                existingArticle = "url";
            }
        });
        return existingArticle;
    };

    // Tags methods
    articlesSrv.getTagByValue = function(value) {
        return _.findWhere(articlesSrv.tags, {value: value});
    };
    articlesSrv.getTags = function() {
        return articlesSrv.tags;
    };
    articlesSrv.getArticlesIdByTag = function(tagValue) {
        var tag = {
            value: tagValue,
            articleIds: []
        };
        articlesSrv.articles.forEach(function(article) {
            if(_.contains(article.tags, tag)) {
                tag.articleIds.push(article.id);
            }
        });
        return tag;
    };
    articlesSrv.isExistingTag = function(tagValue) {
        var existingTag = false;
        articlesSrv.tags.forEach(function(element){
            if(element.value === tagValue) {
                existingTag = true;
            }
        });
        return existingTag;
    };

    articlesSrv.set = function(datas) {
        articlesSrv.articles = datas.articles;
        articlesSrv.tags = datas.tags;
    }



    return articlesSrv;
}

angular
    .module("services")
    .factory("articlesSrv", articlesSrv);