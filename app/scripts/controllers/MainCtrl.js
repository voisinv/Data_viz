var MainCtrl = 
[
'$scope',
function($scope){
	$scope.model = {value: 'hello world'}
	 
 
}
]

angular.module('controllers')
	.controller('MainCtrl', MainCtrl);