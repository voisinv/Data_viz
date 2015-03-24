function linksSrv() {
    var linksSrv = {
        links: [
            {
                id: 1,
                source: 'tag1',
                target: 'tag2',
                value: 3
            },{
                id: 2,
                source: 'tag1',
                target: 'tag3',
                value: 2
            },{
                id: 3,
                source: 'tag1',
                target: 'tag4',
                value: 2
            },{
                id: 4,
                source: 'tag2',
                target: 'tag3',
                value: 2
            },{
                id: 5,
                source: 'tag2',
                target: 'tag4',
                value: 2
            }
        ]
    };

    linksSrv.getLinks = function() {
        return linksSrv.links;
    };
    linksSrv.addLinksBetweenTags = function(article) {
        if(article.tags.length > 1) {
            var linksList = getLinksListOfArticleTags(article);
            linksList.forEach(function(link, index) {
                var o = _.findWhere(linksSrv.links, {source: link.source, target: link.target});
                if(!o) {
                    // awesome underscore.js !!!!!
                    linksSrv.links.push(link);
                } else {
                    o.value++;
                }
            });
        }
    };
    var getLinksListOfArticleTags = function(article) {
        var linksList = [], id = 1, tags = article.tags;
        for(var i=0; i<tags.length-1; i++) {
            for(var j=1; j<tags.length-i; j++) {
                linksList.push({id: id, source: tags[i], target: tags[i+j], value: 1});
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