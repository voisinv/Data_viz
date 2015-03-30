function collection ($rootScope) {
    var list = [
        {
            id: '',
            urls: []
        },{
            id: 'Federer',
            urls: ['1','a','b','c','d','e','f','g','h','i','j','k']
        },{
            id: 'Nadal',
            urls: ['1','a','b','c','d','e','f','g','h','i','j']
        },{
            id: 'Djokovic',
            urls: ['1','a','b','c','d','e','f','g','h','i']
        },{
            id: 'Murray',
            urls: ['1','a','b','c','d','e','f','g','h']
        },{
            id: 'Tsonga',
            urls: ['1','a','b','c','d','e','f','g']
        },{
            id: 'Gasquet',
            urls: ['1','a','b','c','d','e','f']
        },{
            id: 'Del Potro',
            urls: ['1','a','b','c','d','e']
        },{
            id: 'Raonic',
            urls: ['1','a','b','c','d']
        },{
            id: 'Ferrer',
            urls: ['1','a','b','c']
        },{
            id: 'Simon',
            urls: ['1','a','b']
        },{
            id: 'Pouille',
            urls: ['1','a']
        },{
            id: 'Benneteau',
            urls: ['1']
        }
    ];
    var tags = {};

    tags.get = function() {
        return list;
    };

    tags.addLink = function(tag) {
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