var app = angular.module('mainApplication',[]);

function intersect_safe(a, b)
{
  var ai=0, bi=0;
  var result = new Array();

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}

app.controller("MainController", function($scope,$http){
	$scope.maxPrice = 0;
	$scope.filters = [];
	$scope.selectedMake = null;
	$scope.selectedModel = null;
    $scope.makes = [];
    $scope.models = [];
    $http({
            method: 'GET',
            url: '/makes/'
        }).success(function (result) {
        		$scope.makes = result;
    		});


    $scope.$watch('selectedMake', function(){
	    $http({
	            method: 'GET',
	            url: '/models/',
	            params:{make: $scope.selectedMake}
	        }).success(function (result) {
	        		$scope.models = result;
	    		});
    });


    function sync(){
    	if ($scope.filters.length ==2){
    		/*estamos ya sincronizados*/
    		 $scope.results = intersect_safe($scope.filters[0], $scope.filters[1]);
    		 $scope.filters.pop();
    		 $scope.filters.pop();
    	}
    }

	$scope.gofind=function(){
		//traemos los vehiculos por marca y modelo
	    $http({
	            method: 'GET',
	            url: '/vehicle/' + $scope.selectedMake + '/' + $scope.selectedModel
	        }).success(function (result) {
	        		$scope.filters.push(result);
	        		sync();
	    		});		
	    $http({
	            method: 'GET',
	            url: '/vehicle/price/',
	            params: {p: $scope.maxPrice}
	        }).success(function (result) {
	        		$scope.filters.push(result);
	        		sync();
	    		});		
		//traemos los vehiculos por rango de precios


		//hacemos la interseccion
	}
});

