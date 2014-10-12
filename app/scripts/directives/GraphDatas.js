function graphDatas() {
	return {
		restrict : 'A',
		scope : true,
		link: function(scope, iElem, iAttrs) {
			var width = 1000,
			    height = 700,
	            elem = undefined;


			 var force = d3.layout.force()
				            .charge(-700)
				            //.alpha(1)
				            //.gravity(function(d){console.log(d.urls.length);return 1*d.urls.length})
				            // à mettre pour la v2
				            //.linkDistance(600)
				            .size([width, height])
				            .nodes(scope.main.tags);


	    	var svg = d3.select(iElem[0]).append('svg')
	    			.attr("width", width)
	        		.attr("height", height);

			scope.$watchCollection('$parent.main.tags', function(newVal, oldVal) {
				if(angular.equals(newVal, oldVal)) return;
				update(); 
			});

            var update = function() {
				var elem = svg.selectAll('g').data(scope.main.tags);

				var nodes = elem.enter().append('g')
								.call(force.drag);

				nodes.append('circle')
					.attr('class', 'circle')
					.attr('r', function(d,i){return d.urls.length * 50;})

				nodes.append('text')
					.attr('class', 'text-circle')
					.attr('font-size', function(d){return d.urls.length*20})
					.attr('dx', function(d){return d.tagName.length * -5})
					.attr('dy', '.2em')
					.text(function(d){return d.tagName})

				force.on("tick", function() {
					elem.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                });
                console.log(force)
            	force.start();
            }
			update();


		} 
	}
}

angular.module('directives')
		.directive('graphDatas', graphDatas);