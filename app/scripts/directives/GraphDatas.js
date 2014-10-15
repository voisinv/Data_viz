/*
changements syntaxe todd motto virée : ligne 23 / 37 / 41
*/

function graphDatas() {
	return {
		restrict : 'A',
		scope : true,
		link: function(scope, iElem, iAttrs) {
		    var width = 1000,
			    height = 700,
	            elem = undefined;


			var force = d3.layout.force()
				            .charge(-700)
				            //.alpha(1)
				            //.gravity(function(d){console.log(d.urls.length);return 1*d.urls.length})
				            // à mettre pour la v2
				            //.linkDistance(600)
				            .size([width, height])
                            .nodes(scope.main.tags);


	    	var svg = d3.select(iElem[0]).append('svg')
	    			.attr("width", width)
	        		.attr("height", height);

			scope.$watchCollection('$parent.main.tags', function(newVal, oldVal) {
				if(angular.equals(newVal, oldVal)) return;
				update(); 
			}, true);
			scope.$on('newUrl', function(event, arg) {
                handleSize(d3.select('#' + arg.tagName));
			});

            var update = function() {
				var elem = svg.selectAll('g').data(scope.main.tags);

				nodes = elem.enter().append('g')
				    .attr('id', function(d) { return d.tagName; })
                    .on('click', function(d) {scope.main.clickOnTag(d.tagName, d.urls) })
                    .call(force.drag)
                    .on('mouseenter', function(d) {
                        d3.selectAll('g').attr('opacity', 0.5);
                        d3.select(this).attr('opacity', 1);
                    })
                    .on('mouseleave', function(d) { d3.selectAll('g').attr('opacity', 1); });

				handleSize(nodes, false);

				force.on("tick", function() {
					elem.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                });
                console.log(force);
            	force.start();
            }

            var handleSize = function(nodes, fromEvent) {
                nodes.append('circle')
                    .attr('id', function(d) { return d.tagName + '-circle'; })
                    .attr('class', 'circle')
                    .attr('r', function(d,i) { return d.urls.length * 25; });

                /*if(fromEvent) {
                    nodes.remove('text');
                }*/

                nodes.append('text')
                    .attr('id', function(d) { return d.tagName + '-text'; })
                    .attr('font-size', function(d) { return (d.urls.length * 20) + 'px'; })
                    .attr('fill', 'black ')
                    .attr('dy', function(d) { return (d.urls.length*5); })
                    .attr('class', 'text-circle')
                    .attr("text-anchor", "middle")
                    .text(function(d) { return d.tagName; }); //.substr(0, 1).toUpperCase() + d.tagName.substr(1); });
            }

			update();
		} 
	}
}

angular.module('directives')
		.directive('graphDatas', graphDatas);