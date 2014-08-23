angular.module('admin')
.controller(
	'LvyeActivitiesCtrl',
	['$scope', 'AdminService','LvyeService','TagService',
	 	function($scope, AdminService,LvyeService,TagService) {
			TagService.getAll().then(function(data){});
			$scope.current = 0;
			$scope.number = 1;
			$scope.tags={};
		    $scope.uploaded_images = [];
		    LvyeService.getUneditData($scope.current,1).then(function(data) {
		    	$scope.activity = data;
			});
		    $scope.$on("get",function(d,data){
		    	LvyeService.getUneditData(data.start,data.num).then(function(data) {
			    	$scope.activity = data;
				});
		    	
		    })
		    $scope.pre = function(){
		    	$scope.current-=1;
		    	if($scope.current<0){
		    		$scope.current = 0;
		    	}
		    	$scope.$emit("get",{'start':$scope.current,'num':1})
		    };
		    $scope.next = function(){
		    	$scope.current+=1;
		    	$scope.$emit("get",{'start':$scope.current,'num':1})
		    };
		    $scope.$on("saveActivity",function(d,data){
		    	LvyeService.completedEdit($scope.activity.lvyeId,"");
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