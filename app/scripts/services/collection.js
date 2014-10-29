function collection ($rootScope) {
    var list = [
            {
                id: 'vélo',
                urls: ['www.grouppies-bellamy.com','a','a','a','a','a','a','a','a','a','a','a']
            },{
                id: 'germany',
                urls: ['www.grouppies-bellamy.com','a','a','a','a','a','a','a','a','a','a']
            },{
                id: 'muse',
                urls: ['www.grouppies-bellamy.com','a','a','a','a','a','a','a','a','a']
            },{
                id: 'véloa',
                 urls: ['www.grouppies-bellamy.com','a','a','a','a','a','a','a','a']
            },{
                id: 'germanya',
                urls: ['www.grouppies-bellamy.com','a','a','a','a','a','a','a']
            },{
                id: 'musea',
                urls: ['www.grouppies-bellamy.com','a','a','a','a','a','a',]
            },{
                 id: 'vélob',
                 urls: ['www.grouppies-bellamy.com','a','a','a','a','a']
            },{
                 id: 'b',
                 urls: ['www.grouppies-bellamy.com','a','a','a','a']
            },{
                 id: 'museb',
                 urls: ['www.grouppies-bellamy.com','a','a','a']
            }
        ];
    var tags = {};

    tags.get = function() {
        return list;
    };

    tags.addTag = function(tag) {
        var o = _.findWhere(list, {id:tag.id}) || null;
        if(o) {
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