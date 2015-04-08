/**
 * Created by Mac-Vincent on 08/04/15.
 */
var dbconnection = function($firebaseObject, articlesSrv, linksSrv) {

    var ref = new Firebase("https://datapizzz.firebaseio.com/");
    this.connect = function() {
        // download the data into a local object
        var data = $firebaseObject(ref);
        console.log(data)
        return data.$loaded().then(function () {
            articlesSrv.set(data);
            linksSrv.set(data.links)
            return;
        })
    };

    this.save = function(articles, tags, links) {
        if(typeof articles == 'undefined' || typeof tags == 'undefined' || typeof links == 'undefined') return;
        var data = $firebaseObject(ref);
        var a = articlesSrv.getTags();
        console.log(a)
        data.articles = articlesSrv.getArticles();
        data.tags = articlesSrv.getTags();
        data.links = linksSrv.getLinks();
        console.log(data)
        data.$save().then(function(res){console.log(res)})
    };

    this.restore = function() {
        var data = $firebaseObject(ref);
        data.articles = [
         {
         "id": 0,
         "title": "article0",
         "url": "article0.fr",
         "tags": ["tag1", "tag2", "tag3"]
         },{
         "id": 1,
         "title": "article1",
         "url": "article1.fr",
         "tags": ["tag1", "tag4"]
         },{
         "id": 2,
         "title": "article2",
         "url": "article2.fr",
         "tags": ["tag3"]
         },{
         "id": 3,
         "title": "article3",
         "url": "article3.fr",
         "tags": ["tag1", "tag2", "tag3"]
         },{
         "id": 4,
         "title": "article4",
         "url": "article4.fr",
         "tags": ["tag2", "tag4"]
         },{
         "id": 5,
         "title": "article5",
         "url": "article5.fr",
         "tags": ["tag1", "tag2", "tag4"]
         }
         ];
         data.tags = [
         {
         "id": 0,
         "value": "",
         "articleIds": [],
         "radius": 1,
         "fixed": true,
         "x": -1,
         "y": -1
         },{
         "id": 1,
         "value": "tag1",
         "articleIds": [0, 1, 3, 5],
         "radius": 20
         },
         {
         "id": 2,
         "value": "tag2",
         "articleIds": [0, 3, 4, 5],
         "radius": 20
         },
         {
         "id": 3,
         "value": "tag3",
         "articleIds": [0, 2, 3],
         "radius": 15
         },
         {
         "id": 4,
         "value": "tag4",
         "articleIds": [1, 4, 5],
         "radius": 15
         }
         ];
         data.links = [{
         "id": 1,
         "source": 1,
         "target": 2,
         "value": 3
         },{
         "id": 2,
         "source": 1,
         "target": 3,
         "value": 2
         },{
         "id": 3,
         "source": 1,
         "target": 4,
         "value": 2
         },{
         "id": 4,
         "source": 2,
         "target": 3,
         "value": 2
         },{
         "id": 5,
         "source": 2,
         "target": 4,
         "value": 2
         }];

        data.$save();
    }

}

angular.module('services').service('dbconnection', dbconnection);

