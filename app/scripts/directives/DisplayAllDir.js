
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
            var node = link = []

            var w = 1280,
                h = 800,
                nodes = null,
                links,
                force = null,
                color = d3.scale.category10();

            var svg = d3.select("#div-graph").append("svg")
                .attr("width", w)
                .attr("height", h);

            scope.$on('newUrl', function (event, nEle) {
                //nEle.node.radius = 20;
                //scope.datas.nodes.push(nEle.node)
                draw();
                console.log(scope.datas)
                //force.start()
            });

            var DataFctr = main.tags;

            scope.datas = {}

            scope.datas.nodes = main.datas.nodes.map(function (d) {
                return {radius: _.size(d.urls) * 5};
            });

            scope.datas = main.datas;
            var root = scope.datas.nodes[0];

            root.radius = 0;
            root.fixed = true;
            force = d3.layout.force()
                //.charge(120)
                .linkDistance(120)
                .size([w, h])
                .nodes(scope.datas.nodes)
                .links(scope.datas.links)
                .gravity(0.3)
                .charge(function (d) {
                    return -20 * d.radius;
                })
                .size([w, h]);
            //function draw(){
            function draw(){
                console.log(scope.datas)

                link = svg.selectAll(".link")
                    .data(scope.datas.links)
                    .enter().append("line")
                    .attr("class", "link")
                    .style("stroke-width", function (d) {
                        return Math.sqrt(d.value);
                    });

                node = svg.selectAll("circle")
                    .data(scope.datas.nodes)
                    .enter()
                    .append("circle")
                    .attr("r", function (d) {
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
                force.start();
            }
            draw();

        }
    };
}


angular
    .module('directives')
    .directive('displayAllPoints', displayAll);

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
 });*/