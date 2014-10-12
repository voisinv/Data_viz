var dirChart = function($parse, DataValues) {
    var directiveDefinitionObject = {

        restrict: 'E',
        replace: false,
        //scope: {data: '=data'},

        link: function (scope, element, attrs) {
            var data = DataValues.getTags();
            /*[
                {"x":190,"y":34,"r":20,"color":"#FDAE6B","name":"cercle 1"},
                {"x":150,"y":89,"r":39,"color":"#FDD0A2","name":"cercle 2"},
                {"x":267,"y":234,"r":38,"color":"#A1D99B","name":"cercle 3"},
                {"x":100,"y":34,"r":29,"color":"#31A354","name":"cercle 4"},
                {"x":87,"y":89,"r":21,"color":"#3182BD","name":"cercle 5"},
                {"x":160,"y":248,"r":25,"color":"#FD8D3C","name":"cercle 6"},
                {"x":78,"y":150,"r":35,"color":"#A1D99B","name":"cercle 7"},
                {"x":345,"y":156,"r":32,"color":"#9ECAE1","name":"cercle 8"},
                {"x":233,"y":117,"r":24,"color":"#C6DBEF","name":"cercle 9"}
            ];*/

            var svg = d3.select("#testd3").append("div").append("svg").attr("width", 900).attr("height", 850).style({'border': '1px black solid'});

            var nodes = svg.selectAll(".node")
               .data(data)
               .enter()
               .append("g")
               .attr("class","node")
               .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });


            nodes.append("circle")
               .attr("r", function(d) {return d.r})
               .style("fill",function(d){return d.color;})

            nodes.append("text")
               .attr("dy", ".3em")
               .style("text-anchor", "middle")
               .text(function(d) { return d.tagName; });
        }
    };

    return directiveDefinitionObject;
};

angular.module('directives')
		.directive('dirChart', dirChart);