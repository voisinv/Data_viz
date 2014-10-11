function DataValues () {
    var DataValues = {};

    var values = [
        {
            'tagName': 'vélo',
            'url': ['www.velo.fr']
        },{
            'tagName': 'germany',
            'url': ['www.frankfurter-wurstchen.de']
        },{
             'tagName': 'muse',
             'url': ['www.grouppies-bellamy.com']
        }
    ];

    DataValues.getTags = function() {
        return values;
    }
    DataValues.addTag = function(tag) {
        values.push({'tagName': tag.tagName, 'url': tag.url});
    }

    return DataValues;
}

angular
    .module('services')
    .factory('DataValues', DataValues);