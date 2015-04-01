function linksSrv() {
    var linksSrv = {
        links: [
            {
                id: 1,
                source: 1,
                target: 2,
                value: 3
            },{
                id: 2,
                source: 1,
                target: 3,
                value: 2
            },{
                id: 3,
                source: 1,
                target: 4,
                value: 2
            },{
                id: 4,
                source: 2,
                target: 3,
                value: 2
            },{
                id: 5,
                source: 2,
                target: 4,
                value: 2
            }
        ]
    };

    linksSrv.getLinks = function() {
        return linksSrv.links;
    };
    linksSrv.addLinksBetweenTags = function(newArticle, tagsList) {
        if(newArticle.tags.length > 1) {
            var linksList = getLinksListOfArticle(newArticle);
            linksList.forEach(function(link, index) {
                var toFind = {
                    source: {value: link.source.value},
                    target: {value: link.target.value}
                };
                var o = _.findWhere(linksSrv.links, toFind);
                if(!o) {
                    var newLink = {
                        id: linksSrv.getLinks().length,
                        source: _.findWhere(tagsList, {value: link.source.value}),
                        target: _.findWhere(tagsList, {value: link.target.value}),
                        value : 1
                    };
                    linksSrv.links.push(newLink);
                } else {
                    o.value++;
                }
            });
        }
    };
    var getLinksListOfArticle = function(article) {
        var linksList = [], id = 1, tags = article.tags;
        for(var i=0; i<tags.length-1; i++) {
            for(var j=1; j<tags.length-i; j++) {
                linksList.push({id: id, source: {value: tags[i]}, target: {value: tags[i+j]}, value: 1});
                id++;
            }
        }
        return linksList;
    };

    return linksSrv;
}

angular
    .module('services')
    .factory('linksSrv', linksSrv);