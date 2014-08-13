angular.module('admin')
.controller(
	'LvyeActivitiesCtrl',
	['$scope', '$location', '$routeParams', 'AdminService',
	 	function($scope, $location, $routeParams, AdminService) {
			$scope.query_param = {"start": 0,"num": 1}
			$scope.activity = {'tags':[],'images':[]};
			$scope.activities = [];
			$scope.tags={};
		    $scope.uploaded_images = [];
		    AdminService.getLvyeUnedit($scope.query_param.start).then(function(data) {
//		    	$scope.lvye_activities = data;
		    	$scope.go(data[0]);
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
		    $scope.pre = function(){
		    	$scope.query_param.start-=1;
		    	if($scope.query_param.start<0){
		    		$scope.query_param.start = 0;
		    	}
		    	AdminService.getLvyeUnedit($scope.query_param.start).then(function(data) {
//			    	 $scope.lvye_activities = data;
		    		$scope.go(data[0]);
				});
		    };
		    $scope.next = function(){
		    	$scope.query_param.start+=1;
		    	AdminService.getLvyeUnedit($scope.query_param.start).then(function(data) {
//			    	 $scope.lvye_activities = data;
		    		$scope.go(data[0]);
				});
		    };
		    $scope.go = function(lvye_activity) {
		    	$scope.activity = {'tags':[],'images':[]};
		        $scope.activity.title = lvye_activity.title;
		        $scope.activity.startTime = lvye_activity.startTime;
		        $scope.activity.endTime = lvye_activity.endTime;
		        $scope.activity.depart= lvye_activity.fromAddress;
		        $scope.activity.destination = lvye_activity.destinationAddress;
		        $scope.activity.scenerySpot = lvye_activity.scenic.split(" ").join(",");
		        $scope.activity.lvyeId = lvye_activity.id;
		        $scope.activity.web = lvye_activity.url;
		        $scope.activity.content = lvye_activity.content;
		    };
		    
		   
		}	
	]
);