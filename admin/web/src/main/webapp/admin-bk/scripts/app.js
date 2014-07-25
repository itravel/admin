var adminModule = angular.module('admin',['ngRoute']); 
/*adminModule.factory('formDataObject', function() {
	  return function(data) {
	    var fd = new FormData();
	    angular.forEach(data, function(value, key) {
	      fd.append(key, value);
	    });
	    return fd;
	  };
	});*/

adminModule.controller('ActivitiesCtrl',function($scope,$http){
	$http.get('../services/activities').success(function(data) {
	    $scope.activities = data;
	});
	$scope.activity = {};
	$scope.save = function(activity){
		console.log(activity)
		if(activity.id && activity.id>0){
			$http({
				method:'PUT',
				url:'../services/activities/'+activity.id,
				data:$.param(activity),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					
			}).success(function(){
				$('#myModal').modal('hide');
				console.log($scope.myModal);
			});
		}
		else {
			$http({
				method:'POST',
				url:'../services/activities',
				data:$.param(activity),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			
			});
			
		}
	}; 
	$scope.clear = function(){
		$scope.activity = {};
	}
	$scope.go = function(activity){
		$scope.activity = activity;
		$('#myModal').modal();
	}
	
	
	/*$("#fileupload_input").fileupload({
	    url:"../services/images/activities",//文件上传地址
	    done:function(e,result){
	    	JSON.stringify(result.result)
	    	$scope.activity.images=result.result.imageNames;
	    	console.log($scope.activity.image);
	    	
	    }
	});*/
})
.directive('bDatepicker', function () {  
	
    return {  
        restrict: 'A',  
        require: "ngModel",    
        link: function (scope, element, attr,ngModelCtrl) {  
            element.datepicker({  
            	format: 'yyyy-mm-dd',
    	        weekStart: 1,
    	        autoclose: true,
    	        todayBtn: 'linked',
    	        language: 'zh-CN'
          
            }).on('changeDate', function(e) {  
                // var outputDate = new Date(e.date);  
                // var n = outputDate.getTime();  
            	console.log(e);
                ngModelCtrl.$setViewValue(e.currentTarget.value);  
                scope.$apply();  
            });  
            var component = element.siblings('[data-toggle="datepicker"]');  
            if (component.length) {  
                component.on('click', function () {  
                });  
            }  
        }  
    };  
}); 


adminModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider
    .when('/', {templateUrl: 'views/activity_list.html', controller: 'ActivitiesCtrl'});
    
   
}
]);


/*adminModule.directive('bDatepicker', function () {  
	
    return {  
        restrict: 'A',  
        require: "ngModel",    
        template:'<div>dfdfd</div>',
        link: function (scope, element, attr,ngModelCtrl) {  
        	element.modal();
        }  
    };  
}); */