/**
 * Created by Mac-Vincent on 08/04/15.
 */
var dbconnection = function($firebaseObject, articlesSrv, linksSrv) {

    var ref = new Firebase("https://datapizzz.firebaseio.com/");
    var data = $firebaseObject(ref);
    this.connect = function() {
        // download the data into a local object
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

        data.articles = angular.copy(articlesSrv.getArticles());
        data.tags = angular.copy(articlesSrv.getTags());
        data.links = angular.copy(linksSrv.getLinks());
        console.log('getTags', articlesSrv.getTags(), data.tags)

        data.tags.forEach(function(e) {
            e.px = null;
            e.py = null;
            e.weight = null;
            e.x = null;
            e.y = null;
        });
        data.links.forEach(function(e) {
            var source = e.source.id;
            var target = e.target.id;
            e.source = source;
            e.target = target;
        })
        return data.$save().then(function(res){return;})
    };

    this.restore = function() {
        data.articles =  [ {
                "id" : 0,
                "tags" : [ "joistick", "moteur", "roue" ],
                "title" : "avion",
                "url" : "avion"
            }, {
                "id" : 1,
                "tags" : [ "moteur", "roue", "volant" ],
                "title" : "voiture",
                "url" : "voiture"
            }, {
                "id" : 2,
                "tags" : [ "guidon", "roue", "selle" ],
                "title" : "velo",
                "url" : "velo"
            }, {
                "id" : 3,
                "tags" : [ "guidon", "moteur", "roue" ],
                "title" : "moto",
                "url" : "moto"
            }, {
                "id" : 4,
                "tags" : [ "roue" ],
                "title" : "roller",
                "url" : "roller"
            }, {
                "id" : 5,
                "tags" : [ "guidon", "roue" ],
                "title" : "trottinette",
                "url" : "trottinette"
            }, {
                "id" : 6,
                "tags" : [ "moteur", "roue", "volant" ],
                "title" : "tracteur",
                "url" : "tracteur"
            }, {
                "id" : 7,
                "tags" : [ "hélice", "moteur", "volant" ],
                "title" : "bateau",
                "url" : "bateau"
            } ];

            data.links = [ {
                "id" : 0,
                "source" : 0,
                "target" : 1,
                "value" : 1
            }, {
                "id" : 1,
                "source" : 0,
                "target" : 2,
                "value" : 1
            }, {
                "id" : 2,
                "source" : 1,
                "target" : 2,
                "value" : 4
            }, {
                "id" : 3,
                "source" : 1,
                "target" : 3,
                "value" : 3
            }, {
                "id" : 4,
                "source" : 2,
                "target" : 3,
                "value" : 2
            }, {
                "id" : 5,
                "source" : 4,
                "target" : 2,
                "value" : 3
            }, {
                "id" : 6,
                "source" :4,
                "target" : 5,
                "value" : 1
            }, {
                "id" : 7,
                "source" : 2,
                "target" : 5,
                "value" : 1
            }, {
                "id" : 8,
                "source" : 4,
                "target" : 1,
                "value" : 1
            }, {
                "id" : 9,
                "source" : 6,
                "target" : 1,
                "value" : 1
            }, {
                "id" : 10,
                "source" : 6,
                "target" : 3,
                "value" : 1
            } ],
            data.tags =  [ {
                "articleIds" : [ 0 ],
                "id" : 0,
                "radius" : 5,
                "value" : "joistick"
            }, {
                "articleIds" : [ 0, 1, 3, 6, 7 ],
                "id" : 1,
                "radius" : 25,
                "value" : "moteur"
            }, {
                "articleIds" : [ 0, 1, 2, 3, 4, 5, 6 ],
                "id" : 2,
                "radius" : 35,
                "value" : "roue"
            }, {
                "articleIds" : [ 1, 6, 7 ],
                "id" : 3,
                "radius" : 15,
                "value" : "volant"
            }, {
                "articleIds" : [ 2, 3, 5 ],
                "id" : 4,
                "radius" : 15,
                "value" : "guidon"
            }, {
                "articleIds" : [ 2 ],
                "id" : 5,
                "radius" : 5,
                "value" : "selle"
            }, {
                "articleIds" : [ 7 ],
                "fixed" : 0,
                "id" : 6,
                "radius" : 5,
                "value" : "hélice"
            } ]


        data.$save();
    }

}

angular.module('services').service('dbconnection', dbconnection);

