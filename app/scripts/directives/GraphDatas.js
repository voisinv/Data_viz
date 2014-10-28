function graphDatas(collection, $rootScope) {

	return {
		restrict : 'A',
		scope : true,
		link: function(scope, iElem, iAttrs) {
		    var width = 1000,
			    height = 700,
	            elem = undefined,
	            nodes;

			scope.$watchCollection('$parent.main.tags', function(newVal, oldVal) {
				if(angular.equals(newVal, oldVal)) return;
				draw();
			});

			scope.$on('resize', function(event, list) {
			   nodes  = _.findWhere(nodes, {name:list.name})
			});

	    	var svg = d3.select(iElem[0]).append('svg')
	    			.attr("width", width)
	        		.attr("height", height);

            function draw(){
                nodes = collection.get().map(function(d, i) { return {radius: _.size(d.urls) * 8, name: d.name}; }),
                        color = d3.scale.category10();

                var force = d3.layout.force()
                    .gravity(0.3)
                    .charge(function(d, i) { return -30 * d.radius; })
                    .nodes(nodes)
                    .size([width, height]);

                var root = nodes[0];
                root.radius = 0;
                root.fixed = true;

                force.start();

                svg.selectAll("circle")
                    .data(nodes.slice(1))
                    .enter()
                    .append("circle")
                    .attr("r", function(d) { return d.radius - 2; })
                    //.attr('class', 'hoverCircle')
                    .call(force.drag)
                    .attr('class', 'circle')
                    .on('mouseover', function(d) {
                        d3.selectAll("circle").attr('opacity', 0.3);
                        d3.select(this).attr('opacity', 1);
                        $rootScope.$broadcast('hoverTag', { name: d.name });
                    })
                    /*.on('mouseleave', function(d) {
                        d3.selectAll("circle").attr('opacity', 1);
                    })*/
                    .style("fill", function(d, i) { return color(i % _.size(collection.get())); });

                force.on("tick", tick(event));
            }
            function tick (e){

                var q = d3.geom.quadtree(nodes),
                    i = 0,
                    n = nodes.length;
                while (++i < n) {
                  q.visit(collide(nodes[i]));
                }
                return function(){

                    svg.selectAll("circle")
                        .attr("cx", function(d) { return d.x; })
                        .attr("cy", function(d) { return d.y; })
                }


            }

            draw();
		}
	};

	function collide(node) {
      var r = node.radius + 30,
          nx1 = node.x - r,
          nx2 = node.x + r,
          ny1 = node.y - r,
          ny2 = node.y + r;
      return function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
          var x = node.x - quad.point.x,
              y = node.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = node.radius + quad.point.radius;
          if (l < r) {
            l = (l - r) / l * .5;
            node.x -= x *= l;
            node.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2
            || x2 < nx1
            || y1 > ny2
            || y2 < ny1;
      };
    };
}

angular
    .module('directives')
    .directive('graphDatas', graphDatas);