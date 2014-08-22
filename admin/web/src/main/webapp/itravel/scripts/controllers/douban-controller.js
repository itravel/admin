angular.module('admin')
.controller(
	'DoubanActivitiesCtrl',
	['$scope', '$location', '$routeParams', 'AdminService',
	 	function($scope, $location, $routeParams, AdminService) {
			console.log(AdminService.createActivityDO())
			$scope.query_param = {"start": 0,"num": 1}
			$scope.activity = {'tags':[],'images':[],'editing':true};
			$scope.activities = [];
			$scope.tags={};
		    $scope.uploaded_images = [];
		    AdminService.getDoubanUnedit($scope.query_param.start).then(function(data) {
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
		    		$scope.query_param.start = 0;
		    		if($scope.query_param.start<0){
		    	}
		    	AdminService.getDoubanUnedit($scope.query_param.start).then(function(data) {
//			    	 $scope.lvye_activities = data;
		    		$scope.go(data[0]);
				});
		    };
		    $scope.next = function(){
		    	$scope.query_param.start+=1;
		    	AdminService.getDoubanUnedit($scope.query_param.start).then(function(data) {
//			    	 $scope.lvye_activities = data;
		    		$scope.go(data[0]);
				});
		    };
		    $scope.go = function(douban_activity) {
		    	$scope.activity = {'tags':[],'images':[]};
		        $scope.activity.title = douban_activity.title;
		        $scope.activity.startTime = douban_activity.startTime;
		        $scope.activity.endTime = douban_activity.endTime;
		        $scope.activity.depart= douban_activity.depart;
		        $scope.activity.destination = douban_activity.destination;
		        $scope.activity.sponsor = douban_activity.sponsor;
//		        $scope.activity.scenerySpot = lvye_activity.scenic.split(" ").join(",");
		        $scope.activity.lvyeId = douban_activity.id;
		        $scope.activity.web = douban_activity.url;
		        $scope.activity.content = douban_activity.content;
		        $scope.activity.editing=false;
		        $scope.activity.doubanId = douban_activity.id;
		    };
		    $scope.$on("saveActivity",function(d,data){
		    	//AdminService.completeLvyeEdit($scope.activity);
		    });
		    $scope.toggleEdit = function (){
		    	if($scope.activity.editing === true){
		    		AdminService.cancelDoubanEdit($scope.activity.doubanId,'x').then(function(data){
			    		$scope.activity.editing = false;
			    	},function(data){
			    		alert("has been lock by others")
			    	});
		    	}
		    	else {
		    		AdminService.startDoubanEdit($scope.activity.doubanId,'x').then(function(data){
		    			$scope.activity.editing = true;
		    		},function(data){
		    			alert("has been lock by others")
		    		});
		    	}
		    }
		    
		    $scope.showToggleEdit = function(){
		    	if($scope.activity.editing === false){
		    		return "编辑"
		    	}
		    	else {
		    		return "取消编辑"
		    	}
		    }
		   
		}	
	]
);