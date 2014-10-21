
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
        return list;
    }

    tags.exist = function(name) {
        // return undefined if not found
        return _.findWhere(list, {name:name})
    }

    tags.add = function(tag) {
        list.push({name:tag.name, urls:[tag.url]});
    }

    tags.url = function(tag) {
        var o = _.findWhere(list, {name:tag.name}) || {};
        if(!_.contains(o.urls, tag.url)) o.urls.push(tag.url);
    }

    return tags;
}



angular
    .module('services')
    //.factory('DataValues', DataValues)
    .factory('collection', collection)
