function collection ($rootScope) {
    var list = [
        {
            id: '',
            urls: []
        },{
            id: '12',
            urls: ['1','a','b','c','d','e','f','g','h','i','j','k']
        },{
            id: '11',
            urls: ['1','a','b','c','d','e','f','g','h','i','j']
        },{
            id: '10',
            urls: ['1','a','b','c','d','e','f','g','h','i']
        },{
            id: '9',
            urls: ['1','a','b','c','d','e','f','g','h']
        },{
            id: '8',
            urls: ['1','a','b','c','d','e','f','g']
        },{
            id: '7',
            urls: ['1','a','b','c','d','e','f']
        },{
            id: '6',
            urls: ['1','a','b','c','d','e']
        },{
            id: '5',
            urls: ['1','a','b','c','d']
        },{
            id: '4',
            urls: ['1','a','b','c']
        },{
            id: '3',
            urls: ['1','a','b']
        },{
            id: '2',
            urls: ['1','a']
        },{
            id: '1',
            urls: ['1']
        }
    ];
    var tags = {};

    tags.get = function() {
        return list;
    };

    tags.addTag = function(tag) {
        var o = _.findWhere(list, {id:tag.id}) || null;
        if( o ) {
            // On vérifie que le tag existe bien et que l'url n'existe pas déjà dans la liste de ce tag
            if(!_.contains(o.urls, tag.url)) {
                o.urls.push(tag.url);
                $rootScope.$broadcast('newUrl', tag.id);
            }
        }
        else {
            // le tag n'existe pas, on l'ajoute à la liste
            list.push({
                id: tag.id,
                urls:[tag.url]
            });
            $rootScope.$broadcast('newTag');
        }
    };

    return tags;
}

angular
    .module('services')
    .factory('collection', collection);