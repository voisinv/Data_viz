var DataFctr;
//IMPORTANT :
DataFctr = function($rootScope) {
  var datas, getNewId, links, list, verify;
  list = [
    {
      name: '',
      urls: [],
      group: 0,
      id: 0,
      radius: 0,
      fixed: true
    }, {
      name: 'Pere',
      urls: ['a', 'b', 'c', 'd'],
      group: 1,
      id: 1,
      radius: 20
    }, {
      name: 'Mere',
      urls: ['1', 'a', 'b', 'c', 'd', 'e'],
      group: 2,
      id:2,
      radius: 20
    }, {
      name: 'Fils',
      urls: ['1', 'a', 'b', 'c', 'd'],
      group: 3,
      id: 3,
      radius: 20
    }, {
      name: 'Cousin',
      urls: ['1', 'a', 'b', 'c', 'd'],
      group: 0,
      id: 4,
      radius: 20
    }, {
      name: 'Grand-père',
      urls: ['1', 'a', 'b', 'c', 'd', 'e', 'f'],
      group: 0,
      id: 5,
      radius: 20
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

    newNodeId = getNewId();
    newNode = {
      name: name,
      group: 2,
      urls: ['a', 'b', 'c'],
      id: newNodeId,
      radius: 20,
      px: 0,
      py:0,
      x:0,
      y:0
    }
    datas.nodes.push(newNode);

    urls.forEach(function(e) {
     links.push({
        source: newNodeId,
        target: e.id,
        value: 10
      });
    });
    return newNode;
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
