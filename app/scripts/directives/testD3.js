function testD3($rootScope, collection) {
	return {
		restrict : 'A',
		scope : true,
		link: function(scope, iElem, iAttrs) {
            var w = 1280,
                h = 800;

            var nodes = collection.get().map(function(d, i) { return {radius: _.size(d.urls) * 10, name: d.name}; }),
                color = d3.scale.category10();

            var force = d3.layout.force()
                .gravity(0.3)
                .charge(function(d, i) { return -30 * d.radius; })
                .nodes(nodes)
                .size([w, h]);

            var root = nodes[0];
            root.radius = 0;
            root.fixed = true;

            force.start();

            var svg = d3.select("#body").append("svg")
                .attr("width", w)
                .attr("height", h);

            svg.selectAll("circle")
                .data(nodes.slice(1))
              .enter().append("circle")
                .attr("r", function(d) { return d.radius - 2; })
                //.attr('class', 'hoverCircle')
                .call(force.drag)
                .on('mouseover', function(d) {
                    d3.selectAll("circle").attr('opacity', 0.3);
                    d3.select(this).attr('opacity', 1);
                    $rootScope.$broadcast('hoverTag', { name: d.name });
                })
                /*.on('mouseleave', function(d) {
                    d3.selectAll("circle").attr('opacity', 1);
                })*/
                .style("fill", function(d, i) { return color(i % _.size(collection.get())); });

            force.on("tick", function(e) {
              var q = d3.geom.quadtree(nodes),
                  i = 0,
                  n = nodes.length;

              while (++i < n) {
                q.visit(collide(nodes[i]));
              }

              svg.selectAll("circle")
                  .attr("cx", function(d) { return d.x; })
                  .attr("cy", function(d) { return d.y; });
            });



            function collide(node) {
              var r = node.radius + 16,
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
            }
		}

	};
}

angular
    .module('directives')
    .directive('testD3', testD3);