
function collection () {
    var list = [
            {
                name: 'vélo',
                urls: ['www.velo.fr', 'www.pedale.com']
            },{
                name: 'germany',
                urls: ['www.frankfurter-wurstchen.de']
            },{
                name: 'muse',
                urls: ['www.grouppies-bellamy.com']
            }
        ];
    var tags = {};

    tags.get = function() {
        return list
    }

    tags.add = function(tag) {
        // récupère objet complet {name:'', urls:[]};
        var o = _.findWhere(list, {name:tag.name}) || null;
        // Si o != null
        if( o ) {
            // ON vérifie que l'url n'éxiste pas déja dans la liste, si non on ajoute
            if(!_.contains(o.urls, tag.url)) o.urls.push(tag.url);
        } else {
            // crée objet
            list.push({name:tag.name, urls:[tag.url]});
        }
    }

    return tags;
}

angular
    .module('services')
    //.factory('DataValues', DataValues)
    .factory('collection', collection)