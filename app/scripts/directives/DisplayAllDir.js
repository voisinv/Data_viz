var nodeSelected = {};
function displayAll ($window, $mdSidenav, articlesSrv, linksSrv, $timeout) {
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

            var w = $window.innerWidth*0.8,
                h = $window.innerHeight*0.7,
                color = d3.scale.category10();

            var svg = d3.select("#graph").append("svg")
                .attr("width", w)
                .attr("height", h);

            scope.$on('newUrl', function (event, nEle) {
                update();
                //keepNodesOnTop();
            });
            var force = d3.layout.force();
            scope.$on('dbconnection', function() {
                force.nodes(main.tags)
                    .links(main.links);
                update();
            });
            scope.$on('stopForce', function() {
                console.log('stopForce')
                //force.stop();
            })

            scope.$on('displayText', function(e, o) {
                node.selectAll('.text').attr('visibility', function() {
                    return o.toDisplay ?  'display' : 'hidden'
                });
            })


            var node;
            function update() {
                var link = svg.selectAll(".link")
                    .data(linksSrv.getLinks());
                link.enter().append("line")
                    .attr("class", "link")
                    .style("stroke-width", function (d) {
                        return d.value;
                    });

                link.transition().duration(3000)
                    .style("stroke-width", function (d) {
                        return d.value;
                    });
                link.exit().remove();


                var mouseover = false;

                node = svg.selectAll(".node")
                    .data(articlesSrv.getTags());

                node.enter()
                    .append('g')
                    .attr('class', 'node')
                    .call(force.drag);

                node.append('circle')
                    .attr("r", function (d) {
                        return (d.radius - 1) * 0.4;
                    })
                    .attr("id", function (d) {
                        return 'circle-' + d.value;
                    })
                    .style("fill", function (d, i) {
                        return '#3498db'
                    })
                    .on('click', function(e) {
                        /*
                        scope.main.articleSelected = e;
                        $mdSidenav('right').open()
                            .then(function(i){
                                console.log('i', e)
                               i.node = e;
                            });
                            */
                    })

                node.append("text")
                    .attr('class', 'text')
                    .attr("dx", 0)//function(d) {return d.radius+5})
                    .attr("dy", ".35em")
                    .text(function(d) { return d.value })
                    //.style("stroke", "gray");

                /*
                var circle = node.enter()
                    .append("circle")
                    .attr('class', 'circle')
                    .attr("r", function (d) {
                        return d.radius - 1;
                    })
                    .attr("id", function (d) {
                        return 'circle-' + d.value;
                    })
                    .style("fill", function (d, i) {
                        return '#3498db'
                    })
                   .on('mouseover', function (d, i) {
                        d3.selectAll("circle").attr('opacity', 0.3);
                        d3.select(this).attr('opacity', 1);
                        mouseover = true;
                        main.hoverTag(d);
                    })
                    .on('mouseleave', function () {
                        d3.selectAll("circle").attr('opacity', 1);
                    })

                    .call(force.drag);
                 */
                node.transition().duration(1000)
                    .attr('r', function(d) {
                        return (d.radius - 1) *  0.4;
                    });

                //node.exit().remove();

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

                    d3.selectAll("circle")
                        .attr("cx", function (d) {
                            return d.x;
                        })
                        .attr("cy", function (d) {
                            return d.y;
                        });
                    d3.selectAll("text")
                        .attr("x", function (d) {
                            return d.x + d.radius / 2;
                        })
                        .attr("y", function (d) {
                            return d.y;
                        });
                });
                force.charge(120)
                    .linkDistance(main.linkdistance)
                    .size([w, h])
                    .gravity(main.gravity * 0.1)
                    .charge(function (d) {
                        return -1 * main.charge * d.radius;
                    })
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
            //update();

            //---Insert-------

//Toggle stores whether the highlighting is on

        }


    };
    function keepNodesOnTop() {
        $(".circle").each(function( index ) {
            var gnode = this.parentNode;
            gnode.parentNode.appendChild(gnode);
        });
    }

}

var toggleRightCtrl;
toggleRightCtrl = function ($scope, $mdSidenav, $log, $q) {
    var self = this;
    $q.when($mdSidenav('right').isOpen()).then(function () {
        console.log('ok', nodeSelected)
        self.node = nodeSelected;
    });

    self.node = $scope.articleSelected;
    self.close = function () {
        $mdSidenav('right').close()
            .then(function () {
                console.log(self.node)
                $log.debug("close RIGHT is done");
            });
    }
};

angular
    .module('directives')
    .directive('displayAllPoints', displayAll)
    .controller('toggleRightCtrl', toggleRightCtrl);