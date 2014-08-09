angular.module('admin').controller(
		'ActivitiesCtrl',
		[ '$scope', '$location', '$routeParams', 'AdminService',
				function($scope, $location, $routeParams, AdminService) {
					$scope.activity = {};
					$scope.activities = [];
					$scope.tags={};
					AdminService.listActivity(20).then(function(data) {
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
					}

				} ]);