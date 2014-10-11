function DataValues () {
    var DataValues = {};

    var values = [
        {
            tagName: 'vélo',
            urls: ['www.velo.fr']
        },{
            tagName: 'germany',
            urls: ['www.frankfurter-wurstchen.de']
        },{
            tagName: 'muse',
            urls: ['www.grouppies-bellamy.com']
        }
    ];

    DataValues.getTags = function() {
        return values;
    }
    DataValues.addTag = function(tag) {
        var isTagInList = DataValues.isTagInList(tag.tagName);
        if(isTagInList === null)
            values.push({tagName: tag.tagName, urls: [tag.url]});
        else if(!DataValues.isUrlInList(values[isTagInList].urls, tag.url))
            values[isTagInList].urls.push(tag.url);
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