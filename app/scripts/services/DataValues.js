function DataValues ($rootScope) {
    var DataValues = {};

    var values = [
        {
            tagName: 'Vélo',
            urls: ['www.velo.fr', 'www.pedale.com']
        },{
            tagName: 'Germany',
            urls: ['www.frankfurter-wurstchen.de']
        },{
            tagName: 'Muse',
            urls: ['www.grouppies-bellamy.com']
        }
    ];

    DataValues.getTags = function() {
        return values;
    }
    DataValues.addTag = function(tag) {
        var isTagInList = DataValues.isTagInList(tag.tagName);
        if(tag.tagName !== '' && tag.url !== '')
            if(isTagInList === null) {
                values.push({tagName: tag.tagName, urls: [tag.url]});
                console.log('tag added');
            }
            else if(!DataValues.isUrlInList(values[isTagInList].urls, tag.url)) {
                values[isTagInList].urls.push(tag.url);
                $rootScope.$broadcast('newUrl');
                console.log('url added');
            }
    }
    DataValues.isTagInList = function(tagName) {
        for(var i=0; i<values.length; i++) {
            if(values[i].tagName === tagName)
                return i;
        }
        return null;
    }
    DataValues.isUrlInList = function(urlsList ,url) {
        for(var i=0; i<urlsList.length; i++) {
            if(urlsList[i] === url)
                return true;
        }
        return false;
    }

    return DataValues;
}

angular
    .module('services')
    .factory('DataValues', DataValues);