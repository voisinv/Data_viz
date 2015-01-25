function DataFctr ($rootScope) {

    // Donées pour la directive niv2
    var list = [
        {
            name:'',
            urls : [],
            group:0,
            id:0
        },
        {
            name:'Pere',
            urls : ['a','b','c','d'],
            group: 1,
            id :'1'
        }
        ,{
              name: 'Mere',
              urls: ['1','a','b','c','d','e'],
              group: 2,
              id :'2'
        },{
             name: 'Fils',
             urls: ['1','a','b','c','d'],
             group: 3,
             id:'3'
        },
        {
            name: 'Cousin',
            urls: ['1','a','b','c','d'],
            group: 0,
            id:4
        },{
            name: 'Grand-père',
            urls: ['1','a','b','c','d','e','f'],
            group: 0,
            id:5
        }/*,{
            name: 'Gasquet',
            urls: ['1','a','b','c','d','e'],
            group:1,
            id:7
        },{
            name: 'Del Potro',
            urls: ['1','a','b','c','d','e'],
            group: 2,
            id:8
        },{
            name: '3',
            urls: ['1','a','b','c','d'],
            group: 2,
            id:9
        },{
            name: 'Ferrer',
            urls: ['1','a','b','c'],
            group: 2,
            id:10
        },{
            name: 'Simon',
            urls: ['1','a','b'],
            group:2,
            id:11
        },{
            name: 'Pouille',
            urls: ['1','a'],
            group: 2,
            id:12
        },{
            name: 'Benneteau',
            urls: ['1'],
            group: 2,
            id:13
        }*/
    ];

    var links = [
        {source: 1, target: 2, value: 10},
        {source: 1, target: 3, value: 12},
        {source: 2, target: 3, value: 8},
        {source: 1, target: 4, value: 10},
        {source: 2, target: 5, value: 15}
    ];
    var datas = {
        nodes : list,
        links : links
    };

    return datas;
}

angular
    .module('services')
    .factory('DataFctr', DataFctr);