angular.module('admin').controller(
		'ActivitiesCtrl',
		[ '$scope', '$location', '$routeParams', 'AdminService',
				function($scope, $location, $routeParams, AdminService) {
					$scope.currentPage = 0;
					$scope.activity = {};
					$scope.activities = [];
					$scope.tags={};
					AdminService.listActivity($scope.currentPage).then(function(data) {
						$scope.activities = data;
					});
					AdminService.getTags().then(function(data) {

						angular.forEach(data, function(value) {
							$scope.tags["'"+value.tag+"'"]={
									'id' : value.id,
									'tag' : value.tag,
									'selected' : 'false'
								}
						})
					});
					$scope.detail = function(activity) {
						$scope.activity = angular.copy(activity);
						if(activity.images){
							$scope.activity.images = activity.images.split(",");
						}
						if(activity.tags){
							$scope.activity.tags = activity.tags.split(",");
						}
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

				} ]);