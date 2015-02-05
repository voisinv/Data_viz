var DataFctr;

DataFctr = function($rootScope) {
  var datas, getNewId, links, list, verify;
  list = [
    {
      name: '',
      urls: [],
      group: 0,
      id: 0
    }, {
      name: 'Pere',
      urls: ['a', 'b', 'c', 'd'],
      group: 1,
      id: '1'
    }, {
      name: 'Mere',
      urls: ['1', 'a', 'b', 'c', 'd', 'e'],
      group: 2,
      id: '2'
    }, {
      name: 'Fils',
      urls: ['1', 'a', 'b', 'c', 'd'],
      group: 3,
      id: '3'
    }, {
      name: 'Cousin',
      urls: ['1', 'a', 'b', 'c', 'd'],
      group: 0,
      id: 4
    }, {
      name: 'Grand-père',
      urls: ['1', 'a', 'b', 'c', 'd', 'e', 'f'],
      group: 0,
      id: 5
    }
  ];
  links = [
    {
      source: 1,
      target: 2,
      value: 10
    }, {
      source: 1,
      target: 3,
      value: 12
    }, {
      source: 2,
      target: 3,
      value: 8
    }, {
      source: 1,
      target: 4,
      value: 10
    }, {
      source: 2,
      target: 5,
      value: 15
    }
  ];
  datas = {
    nodes: list,
    links: links
  };
  datas.add = function(name, idGroup, urls, id) {
    if ((name != null) || name.length === 0) {
      return;
    }
    id = getNewId;
    datas.nodes.push({
      name: name,
      group: 2,
      urls: ['a', 'b', 'c'],
      id: getNewId
    });
    urls.forEach(function(e) {
      return links.push({
        source: getNewId,
        target: e.id,
        value: 10
      });
    });
    return true;
  };
  verify = function(o) {
    return !_.isUndefined(o) && !_.isNull(o) && o.length !== 0;
  };
  getNewId = function() {
    return datas.nodes.length;
  };
  return datas;
};

angular.module('services').factory('DataFctr', DataFctr);
