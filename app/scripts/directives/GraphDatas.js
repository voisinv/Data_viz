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
				            //.gravity(function(d){console.log(_.size(d.urls));return 1*_.size(d.urls)})
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

			scope.$on('resize', function(event, list) {
			    angular.forEach(list, function(e,i){
                    d3.select('#'+e.name+'-circle')
                        .attr('r', function(){return _.size(e.urls) * 25;});

                    d3.select('#'+e.name+'-text')
                        .attr('dy', function(){return _.size(e.urls) * 5})
                        .attr('font-size', function() { return _.size(e.urls) * 20 + 'px'; });
			    });
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
                    .attr('r', function(d,i) {return _.size(d.urls) * 25; })
                    .on('click', function(d) {
                        hasBeenClicked = true;
                        d3.selectAll('g').attr('opacity', 0.5);
                        d3.select(this.parentElement).attr('opacity', 1);
                    });

                nodes.append('text')
                    .attr('id', function(d) { return d.name + '-text'; })
                    .attr('font-size', function(d) { return (_.size(d.urls) * 20) + 'px'; })
                    .attr('fill', 'black ')
                    .attr('dy', function(d) { return ( _.size(d.urls) *5); })
                    .attr('class', 'text-circle')
                    .attr("text-anchor", "middle")
                    .text(function(d) { return d.name; });

                force.on("tick", function() {
                    elem.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                });

            	force.start();
            };

			draw();

			///TODO : visualisation claire - analyse force ?
		} 
	};
}

angular
    .module('directives')
    .directive('graphDatas', graphDatas);