var DataFctr, Tags;
//IMPORTANT : id des links doivent être de type number

Tags = function() {
    list = [
        {
            id: 0,
            name: 'Roue',
            occurence : 0
        },
        {
            id: 1,
            name: 'Moteur',
            occurence: 0
        },
        {
            id: 2,
            name: 'Guidon',
            occurence: 0
        },
        {
            id: 3,
            name: 'Volant',
            occurence: 0
        },
        {
            id: 4,
            name: 'Pédale',
            occurence: 0
        },
        {
            id: 5,
            name: 'Selle',
            occurence: 0
        }
    ]

    this.get = function() {return list}
}

DataFctr = function($rootScope) {
  var datas, getNewId, links, list, verify;
  list = [
    {
      name: '',
      tags: [],
      group: 0,
      id: 0,
      radius: 0,
      fixed: true
    }, {
      name: 'Roue',
      urls: ['Voiture', 'Vélo', 'BMX', 'Tracteur', 'Moto'],
      group: 2,
      id:1,
      radius: 25
    }, {
      name: 'Moteur',
      urls: ['Voiture', 'Tracteur', 'Moto'],
      group: 3,
      id: 2,
      radius: 15
    }, {
      name: 'Guidon',
      urls: ['Vélo', 'BMX', 'Moto'],
      group: 0,
      id: 3,
      radius: 10
    }, {
      name: 'Selle',
      urls: ['Vélo'],
      group: 0,
      id: 4,
      radius: 5
    },
    {
      name: 'Volant',
      urls: ['Voiture', 'Tracteur'],
      group: 0,
      id: 5,
      radius: 5
    }
  ];
  var build = function(){
      for(var i = 1; i < list.length - 1; i++) {

          for(var i2 = i + 1; i2 < list.length; i2++) {
              setLinks(list[i], list[i2])
          }
      }
      console.log('links ', links)
      return links

  };
  links = [];
  function setLinks(source, target) {
      // pour chaque url de sourceId, est ce que une correspond à targetId
      angular.forEach(source.urls, function(url1, idS) {
          angular.forEach(target.urls, function(url2, idT) {
            if(url1 == url2) {
                var o = _.findWhere(links, {source: source.id,
                    target: target.id})
                if (o) {
                    o.value += 1
                } else {
                    links.push(
                        {
                            source: source.id,
                            target: target.id,
                            value: 1
                        }
                    )
                }
            }
          });
      });
  };

  linkss = [
    {
      source: 1,
      target: 2,
      value: 3
    }, {
      source: 1,
      target: 3,
      value: 3
    }, {
      source: 1,
      target: 4,
      value: 1
    }, {
      source: 1,
      target: 5,
      value: 2
    }, {
      source: 2,
      target: 5,
      value: 15
    }
  ];

  datas = {
    nodes: list,
    links: build()
  };

  datas.addTag = function(tag) {

  }

  datas.add = function(name, idGroup, urls, id) {
      var newList = []
      angular.forEach(urls, function(e) {
          console.log(list)
         var o =  _.findWhere(list, {name: e.name});
          o.urls.push(name);
          o.radius += 5;
        newList.push(e.name)
      })


      newNodeId = getNewId();
      newNode = {
        name: name,
        group: 2,
        urls: newList,
        id: newNodeId,
        radius: 20,
        px: 0,
        py:0,
        x:0,
        y:0
      }
      //datas.nodes.push(newNode);

      for(var i1 = 0; i1 < newList.length -1; i1++) {
          for(var i2= i1 + 1; i2<newList.length; i2++) {
              alreadyLinked(newList[i1], newList[i2])
          }
      };
      /*
    urls.forEach(function(e) {
     links.push({
        source: newNodeId,
        target: e.id,
        value: 5
      });
    });*/
    return newNode;
  };
  verify = function(o) {
    return !_.isUndefined(o) && !_.isNull(o) && o.length !== 0;
  };
  getNewId = function() {
    return datas.nodes.length;
  };
  function alreadyLinked(tag1, tag2) {
      console.log('tags ', tag1, tag2)
      for(var i1 = 0; i1 < links.length ; i1++) {
              if(links[i1].source.name == tag1 && links[i1].target.name == tag2 ||
                  links[i1].source.name == tag2 && links[i1].target.name == tag1) {

                  links[i1].value += 5;
                  return true;
              }
      }
      console.log(_.findWhere(list, {name:tag1}));
      links.push(
          {
              source: _.findWhere(list, {name:tag1}).id,
              target: _.findWhere(list, {name:tag2}).id,
              value: 4

          }
      )
      return false;
  }
  return datas;
};

angular.module('services').factory('DataFctr', DataFctr);
angular.module('services').service('Tags', Tags)
