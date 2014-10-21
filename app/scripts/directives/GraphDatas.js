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
				            .charge(function(d, i) { return i ? 0 : -2000; })
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

				draw(newVal);
			});

			scope.$on('resize', function(event, arg) {
                 d3.select('#'+arg.name+'-circle')
                    .attr('r', function(){return _.size(arg.urls) * 25;});

                 d3.select('#'+arg.name+'-text')
                    .attr('dy', function(){return _.size(arg.urls) * 5})
                    .attr('font-size', function() { return _.size(arg.urls) * 20 + 'px'; });
			});
			var hasBeenClicked = false;

            var draw = function() {
				var elem = svg.selectAll('g').data(scope.main.tags);

                // draw g
				nodes = elem.enter().append('g')
				    .attr('id', function(d) { return d.name; })
                    .call(force.drag)
                    .on('click', function(d) { scope.main.clickOnTag(d.name, d.urls); })
                    .on('mouseenter', function(d) {
                        d3.selectAll('g').attr('opacity', 0.5);
                        d3.select(this).attr('opacity', 1);
                    })
                    .on('mouseleave', function(d) {
                        if(!hasBeenClicked) {
                            d3.selectAll('g').attr('opacity', 1);
                        }
                    });

                nodes.append('circle')
                    .attr('id', function(d) { return d.name + '-circle'; })
                    .attr('class', 'circle')
                    .attr('r', function(d,i) {return d.urls.length * 25; })
                    ///TODO : Moyen de voir celui qui est sélectionné ? (les autres restent avec faible opacité)
                    .on('click', function(d) {
                        hasBeenClicked = true;
                        d3.selectAll('g').attr('opacity', 0.5);
                        d3.select(this.parentElement).attr('opacity', 1);
                    })

                ///TODO : le texte ne s'efface pas (visible avec germany)
                /*if(fromEvent) {
                    nodes.remove('text');
                }*/

                nodes.append('text')
                    .attr('id', function(d) { return d.name + '-text'; })
                    .attr('font-size', function(d) { return (d.urls.length * 20) + 'px'; })
                    .attr('fill', 'black ')
                    .attr('dy', function(d) { return ( _.size(d.urls) *5); })
                    .attr('class', 'text-circle')
                    .attr("text-anchor", "middle")
                    .text(function(d) { return d.name; }); //.substr(0, 1).toUpperCase() + d.name.substr(1); });

                force.on("tick", function() {
                    elem.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                });

            	force.start();
            }

			draw();
		} 
	}
}

angular.module('directives')
		.directive('graphDatas', graphDatas);