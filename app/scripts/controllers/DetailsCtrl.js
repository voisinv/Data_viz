/**
 * Created by Mac-Vincent on 03/04/15.
 */

var DetailsCtrl = function(articlesSrv, linksSrv) {
    var self = this;
    self.modeByArticles = true;
    self.articles = articlesSrv.getArticles(); // article = {id, tags, title, url}
    self.tags = articlesSrv.getTags(); // tag = {articleIds, value}
    self.links = linksSrv.getLinks();

    console.log('loaded', self.links)
}
angular.module('controllers')
.controller('DetailsCtrl', DetailsCtrl);