function graphDatas() {
	return {
		restrict : 'A',
		scope : true,
		link: function(scope, iElem, iAttrs) {
			var width = 1000;
			var height = 700;
			var color = d3.scale.category20c();
			console.log(scope);
			iElem.css('width', width);
			iElem.css('height', height);
			console.log(scope.main.tags)

			iElem.css('border', 'solid black 1px')


			 var force = d3.layout.force()
				            .charge(-700)
				            // à mettre pour la v2
				            //.linkDistance(600)
				            .size([width, height])
				            .nodes(scope.main.tags)
				            .start()
				            ;

			scope.$watchCollection('$parent.main.tags', function(newVal, oldVal) {
				if(angular.equals(newVal, oldVal)) return;
				console.log('watch called');
				displayData(); 
			});
	    	//d3.select(iElem[0]).remove('svg');
	    	var svg = d3.select(iElem[0]).append('svg')
	    			.attr("width", width)
	        		.attr("height", height);
            var displayData = function() {
				var elem = svg.selectAll('circle')
								.data(scope.main.tags);
				console.log(scope.main.tags);

				var nodes = elem.enter()
					.append('circle')
					.attr('class', 'circle')
					.attr('r', function(d){return d.urls.length * 40})
					.on('click', function(d){console.log('click')});

				elem.call(force.drag);
				/*
				force.on('end', function() {
					nodes
                    .attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });
				});
				*/
				console.log('node');
				console.log(nodes)

				force.on("tick", function() {
                    elem
                    .attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });
                });
				force.start();

            }
			displayData();
		} 
	}
}

angular.module('directives')
		.directive('graphDatas', graphDatas);