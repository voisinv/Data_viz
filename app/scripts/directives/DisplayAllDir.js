
function displayAll ($rootScope, DataFctr) {
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

    return {
        restrict : 'A',

        controller:'MainCtrl',
        link: function(scope, element, attrs, ctrl) {
            var main = scope.main;
            var node = link = [];

            var w = 1280,
                h = 800,

                color = d3.scale.category10();

            var svg = d3.select("#graph").append("svg")
                .attr("width", w)
                .attr("height", h);

            scope.$on('newUrl', function (event, nEle) {
                update();
                keepNodesOnTop();
            });

            //main.datas = main.datas;


            /*.charge(120)
             .linkDistance(120)
             .size([w, h])
             .gravity(0.3)
             .charge(function (d) {
             return -20 * d.radius;
             })
             .size([w, h]);*/

            var force = force = d3.layout.force();
            force.nodes(main.tags)
                .links(main.links);


            function update() {
                var link = svg.selectAll(".link")
                    .data(main.links);
                link.enter().append("line")
                    .attr("class", "link")
                    .style("stroke-width", function (d) {
                        return Math.sqrt(d.value);
                    });

                link.transition().duration(3000)
                    .style("stroke-width", function (d) {
                        return Math.sqrt(d.value);
                    });
                //link.exit().remove();
                var node = svg.selectAll("circle")
                    .data(main.tags);

                node.enter()
                    .append("circle")
                    .attr('class', 'circle')
                    .attr("r", function (d) {
                        //return d.radius- 1;
                        return d.radius - 1;
                    })
                    .attr("id", function (d) {
                        return 'circle-' + d.value;
                    })
                    .on('mouseover', function (d, i) {
                        d3.selectAll("circle").attr('opacity', 0.3);
                        d3.select(this).attr('opacity', 1);
                        main.hoverTag(d)
                    })
                    .on('mouseleave', function () {
                        d3.selectAll("circle").attr('opacity', 1);
                    })
                    .style("fill", function (d, i) {
                        return '#3498db'
                    })
                    .call(force.drag);
                node.transition().duration(1000)
                    .attr('r', function(d) {
                        return d.radius + 1
                    });

                node.exit().remove();

                force.on("tick", function () {
                    link.attr("x1", function (d) {
                        return d.source.x;
                    })
                        .attr("y1", function (d) {
                            return d.source.y;
                        })
                        .attr("x2", function (d) {
                            return d.target.x;
                        })
                        .attr("y2", function (d) {
                            return d.target.y;
                        });

                    node.attr("cx", function (d) {
                        return d.x;
                    })
                        .attr("cy", function (d) {
                            return d.y;
                        });

                });
                force.charge(120)
                    .linkDistance(10)
                    .size([w, h])
                    .gravity(0.3)
                    .charge(function (d) {
                        return -500 * d.radius;
                    })
                    .size([w, h])
                    /*
                    .gravity(.01)
                    .charge(-80000)
                    .friction(0)
                    .linkDistance(function (d) {
                        return d.value * 10
                    })
                    .size([w, h])*/
                    .start()
            }
            update();
        }

    };
    function keepNodesOnTop() {
        $(".circle").each(function( index ) {
            var gnode = this.parentNode;
            gnode.parentNode.appendChild(gnode);
        });
    }
}


angular
    .module('directives')
    .directive('displayAllPoints', displayAll);