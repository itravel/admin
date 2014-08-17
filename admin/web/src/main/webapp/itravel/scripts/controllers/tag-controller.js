angular.module('admin').controller('TagCtrl',['$scope','$http', '$location', '$routeParams', 'AdminService',
function($scope, $http,$location, $routeParams, AdminService) {
    $http.get(services.tag).success(function(data) {
        $scope.tags = data;
    });
    
    $http.get(services.category).success(function(data) {
        $scope.tagCategories = data;
    });
    $scope.save = function(tag) {
        if (!tag) {
            return
        }
        $http({
            method: 'POST',
            url: services.tag,
            data: $.param(tag),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }

        }).success(function(data) {
            $scope.tags.push(data);
        });

    };
    $scope.clean = function() {
        $scope.tag = null
    };
    $scope.saveCategory = function(tagCategory) {
        if (!tagCategory) {
            return
        }
        $http({
            method: 'POST',
            url: services.category,
            data: $.param(tagCategory),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }

        }).success(function(data) {
            console.log(data);
            $scope.tagCategories.push(data)
        });
    };
    $scope.cleanCategory = function() {
        $scope.tagCategory = null
    };
    $scope.deleteTagCategory = function(tagCategory){
    	AdminService.deleteTagCategory(tagCategory).then(function(data){
    		var index = $scope.tagCategories.indexOf(tagCategory)
        	$scope.tagCategories.splice(index,1);
    	})
    	
    	
    };
    $scope.deleteTag = function(tag){
    	console.log(tag);
    	AdminService.deleteTag(tag).then(function(data){
    		var index = $scope.tags.indexOf(tag)
        	$scope.tags.splice(index,1);
    	})
    	
    }
    
    

}])