angular.module('admin')
.controller(
	'LvyeActivitiesCtrl',
	['$scope', '$location', '$routeParams', 'AdminService',
	 	function($scope, $location, $routeParams, AdminService) {
			$scope.query_param = {"start": 0,"num": 1}
		 	$scope.activity = {tags:[],images:[]};
		 	$scope.lvye_activity = {};
		    $scope.uploaded_images = [];
		    AdminService.getLvyeUnedit($scope.query_param.start).then(function(data) {
		    	$scope.lvye_activities = data;
			});
		    AdminService.getTags().then(function(data) {
		    	
		        angular.forEach(data,function(value){
		        	$scope.activity.tags.push({'id':value.id,'tag':value.tag,'selected':'false'})
		        })
			});
		    $scope.pre = function(){
		    	$scope.query_param.start-=1;
		    	if($scope.query_param.start<0){
		    		$scope.query_param.start = 0;
		    	}
		    	AdminService.getLvyeUnedit($scope.query_param.start).then(function(data) {
			    	 $scope.lvye_activities = data;
				});
		    };
		    $scope.next = function(){
		    	$scope.query_param.start+=1;
		    	AdminService.getLvyeUnedit($scope.query_param.start).then(function(data) {
			    	 $scope.lvye_activities = data;
				});
		    };
		    $scope.go = function(lvye_activity) {
		        $scope.activity.title = lvye_activity.title;
		        $scope.activity.startTime = lvye_activity.startTime;
		        $scope.activity.endTime = lvye_activity.endTime;
		        $scope.activity.from = lvye_activity.fromAddress;
		        $scope.activity.destination = lvye_activity.destinationAddress;
		        $scope.activity.scenerySpot = lvye_activity.scenic.split(" ").join(",");
		        $scope.activity.lvyeId = lvye_activity.id;
		        $scope.activity.web = lvye_activity.url;
		        $scope.activity.content = lvye_activity.content;
		    };
		    
		    $scope.clear = function() {
		        $scope.activity = {};
		    };
		    //保存到服务器
		    $scope.save = function(activity) {
		    	var newActivity = angular.copy(activity);
		    	
		    	newActivity.images = activity.images.join(",");
		    	var selectedTags = [];
		    	angular.forEach(activity.tags,function(tag){
		    		console.log(tag.selected)
		    		if(tag.selected===true){
		    			selectedTags.push(tag.id);
		    		}
		    	});
		    	
		    	newActivity.tags = selectedTags.join(",");
		    	AdminService.saveActivity(newActivity);

		        
		        
		    };
		}	
	]
);