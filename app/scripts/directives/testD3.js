function testD3($rootScope, $timeout) {
	return {
		restrict : 'A',
		scope : true,
		link: function(scope, elem, attrs) {
            var w = 1280,
                h = 800,
                nodes = null;

            var nodes = scope.test.tags.map(function(d, i) { return {radius: _.size(d.urls) * 10, id: d.id}; }),
                color = d3.scale.category10();

            scope.$on('newTag', function(event) {
                draw();
            });

            scope.$on('newUrl', function(event, tagId) {
                if(nodes) {
                    _.findWhere(nodes, {id: tagId}).radius += 10;
                    resize(tagId);
                }
            });

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
                .attr("r", function(d) { return d.radius-1; })
                .attr("id", function(d) { return 'circle-' + d.id; })
                .call(force.drag)
                .on('mouseover', function(d) {
                    d3.selectAll("circle").attr('opacity', 0.3);
                    d3.select(this).attr('opacity', 1);
                    $rootScope.$broadcast('hoverTag', d.id);
                })
                .on('mouseleave', function(d) { d3.selectAll("circle").attr('opacity', 1); })
                .style("fill", function(d, i) { return color(i % _.size(scope.test.tags)); });

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

            function resize(tagId) {
                var node = d3.select('#circle-' + tagId)
                             .attr('r', function(d) { return d.radius-1; });
                             force.start();
            }
		}
	};
}

angular
    .module('directives')
    .directive('testD3', testD3);