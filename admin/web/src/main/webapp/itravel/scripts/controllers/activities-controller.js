angular.module('admin').controller(
		'ActivitiesCtrl',
		[ '$scope', '$location', '$routeParams', 'AdminService','ActivityService',
				function($scope, $location, $routeParams, AdminService,ActivityService) {
					$scope.currentPage = 0;
					$scope.activity = {'editing':false};
					$scope.activities = [];
					$scope.tags={};
					AdminService.listActivity($scope.currentPage).then(function(data) {
						$scope.activities = data;
					});
					$scope.detail = function(activity) {
						ActivityService.get(activity.id).then(function(data){
							
							$scope.activity = data;
							$scope.activity.editing = false;
						})
						
					};
					$scope.prePage = function (){
						if($scope.currentPage <= 0){
							return ;
						}
						$scope.currentPage -=1;
						var offset = $scope.currentPage *15;
						AdminService.listActivity(offset).then(function(data) {
							$scope.activities = data;
						});
					};
					$scope.nextPage = function() {
						var offset = ($scope.currentPage+1)*15 
						AdminService.listActivity(offset).then(function(data) {
							if(data.length>0){
								$scope.activities = data;
								$scope.currentPage +=1;
							}
						});
					}
					$scope.toggleEdit = function (){
				    	if($scope.activity.editing === true){
				    		$scope.activity.editing = false;
				    	}
				    	else {
				    		$scope.activity.editing = true;
				    	}
					};
					    
				    $scope.showToggleEdit = function(){
				    	if($scope.activity.editing === false){
				    		return "编辑"
				    	}
				    	else {
				    		return "取消编辑"
				    	}
				    };
				    $scope.$on("saveActivity",function(d,data){
				    	$scope.activity.editing=false;
				    });
					  

				} ]);