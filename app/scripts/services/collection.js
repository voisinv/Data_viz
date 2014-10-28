function collection () {
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
    }

    tags.add = function(tag) {
        // récupère objet complet {id:'', urls:[]};
        var o = _.findWhere(list, {id:tag.id}) || null;
        // Si o != null
        if( o ) {
            // ON vérifie que l'url n'éxiste pas déja dans la liste, si non on ajoute
            if(!_.contains(o.urls, tag.url)) o.urls.push(tag.url);
        } else {
            // crée objet
            list.push({id:tag.id, urls:[tag.url]});
        }
    }

    return tags;
}

angular
    .module('services')
    //.factory('DataValues', DataValues)
    .factory('collection', collection);