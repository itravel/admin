angular.module('admin')
.controller(
	'LvyeActivitiesCtrl',
	['$scope', 'AdminService','LvyeService','TagService','ActivityService',
	 	function($scope, AdminService,LvyeService,TagService) {
			TagService.getAll().then(function(data){});
			$scope.current = 0;
			$scope.number = 6;
			$scope.tags={};
		    $scope.uploaded_images = [];
		    LvyeService.getUneditDataPage($scope.current,$scope.number).then(function(data) {
		    	$scope.activities = data;
			});
		    $scope.detail = function(lvyeActivity){
		    	$scope.activity = LvyeService.transform(lvyeActivity);
		    };
		    $scope.$on("get",function(d,data){
		    	LvyeService.getUneditDataPage(data.start,data.num).then(function(data) {
			    	$scope.activities = data;
				});
		    	
		    });
		    
		    $scope.prePage = function (){
		    	$scope.current-=$scope.number;
		    	if($scope.current<0){
		    		$scope.current = 0;
		    	}
		    	$scope.$emit("get",{'start':$scope.current,'num':$scope.number})
			};
			$scope.nextPage = function() {
				$scope.current+=$scope.number;
		    	$scope.$emit("get",{'start':$scope.current,'num':$scope.number})
			}
		    $scope.$on("saveActivity",function(d,data){
		    	$scope.activity.editing=false;
		    	LvyeService.completedEdit($scope.activity.lvyeId,"").then(function(data){
		    	});
		    });
		    $scope.toggleEdit = function (){
		    	if($scope.activity.editing === true){
		    		LvyeService.cancelEdit($scope.activity.lvyeId,'x').then(function(data){
			    		$scope.activity.editing = false;
			    	},function(data){
			    		alert("has been lock by others")
			    	});
		    	}
		    	else {
		    		LvyeService.doEdit($scope.activity.lvyeId,'x').then(function(data){
		    			$scope.activity.editing = true;
		    		},function(data){
		    			alert("has been lock by others")
		    		});
		    	}
		    }
		    
		    $scope.showToggleEdit = function(){
		    	if($scope.activity&&$scope.activity.editing === true){
		    		return "取消编辑"
		    	}
		    	else {
		    		return "编辑"
		    	}
		    }
		   
		}	
	]
);