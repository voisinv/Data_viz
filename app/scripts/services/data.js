function DataValues () {
    var DataValues = {};

    var values = [
        {
            'tagName': 'vélo',
            'url': ['www.velo.fr','www.pedale.fr','www.cyclix.com']
        },{
            'tagName': 'germany',
            'url': ['www.frankfurter-wurstchen.de','www.kalkbrenner.de']
        },{
             'tagName': 'muse',
             'url': ['www.grouppies-bellamy.com']
        }
    ];

    DataValues.getData = function() {
        console.log('dataaaaa');
        return values;
    }

    return DataValues;
}

angular
    .module('services')
    .factory('DataValues', DataValues);