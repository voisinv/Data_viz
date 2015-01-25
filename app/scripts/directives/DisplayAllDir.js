
function displayAll ($rootScope, DataFctr) {
    return {
            restrict : 'A',

            controller:'MainCtrl',
            link: function(scope, element, attrs, ctrl) {
                var main = scope.main;

                var w = 1280,
                    h = 800,
                    nodes = null,
                    links,
                    force = null,
                    color = d3.scale.category10();

                var svg = d3.select("#div-graph").append("svg")
                    .attr("width", w)
                    .attr("height", h);

                scope.$on('newTag', function() {
                    draw();
                });

                scope.$on('newUrl', function(event, tagId) {
                    console.log('resize')
                    if(nodes) {
                        _.findWhere(nodes, {id: tagId}).radius += 10;
                        resize(tagId);
                    }
                });

                var DataFctr = main.tags;

                function draw() {
                    nodes = ctrl.datas.nodes.map(function (d) {
                            return {radius: _.size(d.urls) * 5, id: d.id, group: d.group};
                        });

                    console.log('ctrl' , ctrl)
                    links = ctrl.datas.links;

                    force = d3.layout.force()
                        //.charge(120)
                        .linkDistance(120)
                        .size([w, h])
                        .nodes(nodes)
                        .links(links)
                        .gravity(0.3)
                        .charge(function (d) {
                            return -20 * d.radius;
                        })
                        .size([w, h]);

                    var root = nodes[0];
                    root.radius = 0;
                    root.fixed = true;

                    var link = svg.selectAll(".link")
                                .data(links)
                                .enter().append("line")
                                .attr("class", "link")
                                .style("stroke-width", function(d) { return Math.sqrt(d.value); });

                    var node = svg.selectAll("circle")
                        .data(nodes)
                        .enter()
                        .append("circle")
                        .attr("r", function (d) {
                            console.log(d.radius)
                            return d.radius - 1;
                        })
                        .attr("id", function (d) {
                            return 'circle-' + d.id;
                        })
                        .call(force.drag)
                        .on('mouseover', function (d, i) {
                            d3.selectAll("circle").attr('opacity', 0.3);
                            d3.select(this).attr('opacity', 1);
                            main.hoverTag(main.tags[i])
                        })
                        .on('mouseleave', function () {
                            d3.selectAll("circle").attr('opacity', 1);
                        })
                        .style("fill", function (d, i) {
                            return '#3498db'
                        });
                        force.on("tick", function() {
                            link.attr("x1", function(d) { return d.source.x; })
                            .attr("y1", function(d) { return d.source.y; })
                            .attr("x2", function(d) { return d.target.x; })
                            .attr("y2", function(d) { return d.target.y; });

                            node.attr("cx", function(d) { return d.x; })
                            .attr("cy", function(d) { return d.y; });
                        });
                    /*
                    force.on("tick", function () {
                        var q = d3.geom.quadtree(nodes),
                            i = 0,
                            n = nodes.length;

                        while (++i < n) {
                            q.visit(collide(nodes[i]));
                        }

                        svg.selectAll("circle")
                            .attr("cx", function (d) {
                                return d.x;
                            })
                            .attr("cy", function (d) {
                                return d.y;
                            });
                    });
                    */
                    function collide(node) {
                        var r = node.radius + 16,
                            nx1 = node.x - r,
                            nx2 = node.x + r,
                            ny1 = node.y - r,
                            ny2 = node.y + r;
                        return function (quad, x1, y1, x2, y2) {
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
                    force.start();
                }

                function resize(tagId) {
                    var node = d3.select('#circle-' + tagId)
                        .attr('r', function (d) {
                            console.log(d)
                            return d.radius - 1;
                        });
                    force.start();
                    //draw();
                }

                draw();
            }
        };
}


angular
    .module('directives')
    .directive('displayAllPoints', displayAll);

