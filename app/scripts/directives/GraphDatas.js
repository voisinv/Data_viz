function graphDatas() {
	return {
		restrict : 'A',
		scope : true,
		link: function(scope, iElem, iAttrs) {
			var width = 1000;
			var height = 700;
			console.log(scope);
			iElem.css('width', width);
			iElem.css('height', height);

			iElem.css('border', 'solid black 1px')


			 var force = d3.layout.force()
            .charge(-900)
            .linkDistance(300)
            .size([width, height])
            .nodes(scope.main.tags)
            .start()
            ;
			scope.$watchCollection('$parent.main.tags', function() {
				console.log(scope.$parent.main.tags);
                var svg = d3.select(iElem[0]).append('svg')
                .attr("width", width)
                .attr("height", height);

				//var svg = d3.select(iElem[0]).append('svg').append('circle');
				//console.log(svg);
					var node = svg.selectAll('.circle')
									.data(scope.main.tags)
									.enter()
									.append('circle')
									.attr('class', 'circle')
									.attr('r', function(d){return d.urls.length * 40})
									.call(force.drag);
 
					console.log(svg); 
					
				force.on("tick", function() {
                    
                    node.attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });
                });
			})
		} 
	}
}

angular.module('directives')
		.directive('graphDatas', graphDatas);