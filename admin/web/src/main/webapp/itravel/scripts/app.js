var services = {
    activities: "/itravel/services/activities/",
    tag: "/itravel/services/tags/",
    category: "/itravel/services/tags/categories/",
    lvye_activity: "/admin-web/services/lvye_activity"

}
var adminModule = angular.module('admin', ['ngRoute', 'blueimp.fileupload']);
adminModule.controller('ActivitiesCtrl',
function($scope, $http) {
    $scope.query_param = {
        "start": 1,
        "num": 1
    }
    $scope.activity = {
    		tags:[],
    		images:[]
    		
    };
    $scope.lvye_activity = {};
    $scope.uploaded_images = [];
    
    $http({
        method: 'GET',
        url: services.lvye_activity,
        params: $scope.query_param
    }).success(function(data) {
        $scope.lvye_activities = data;
    });
    
    $http({
        method: 'GET',
        url: services.tag
    }).success(function(data) {
        $scope.activity.tags = []
        angular.forEach(data,function(value){
        	$scope.activity.tags.push({'id':value.id,'tag':value.tag,'selected':'false'})
        })
        	
        
    });
    
    $scope.save = function(activity) {
    	var newActivity = angular.copy(activity);
    	
    	newActivity.images = newActivity.images.join(",");
    	var selectedTags = [];
    	angular.forEach(activity.tags,function(tag){
    		console.log(tag.selected)
    		if(tag.selected===true){
    			selectedTags.push(tag.id);
    		}
    	})
    	
    	newActivity.tags = selectedTags.join(",");
        if (activity.id && activity.id > 0) {
            $http({
                method: 'PUT',
                url: services.activities + activity.id,
                data: $.param(newActivity),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

            }).success(function() {
                //
            });
        } else {
            $http({
                method: 'POST',
                url: services.activities,
                data: $.param(newActivity),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

            });

        }
    };
    $scope.clear = function() {
        $scope.activity = {};
    }
    $scope.next = function(){
    	$scope.query_param.start-=1;
    	if($scope.query_param.start<0){
    		$scope.query_param.start = 0;
    	}
    	$http({
            method: 'GET',
            url: services.lvye_activity,
            params: $scope.query_param
        }).success(function(data) {
            $scope.lvye_activities = data;
        });
    }
    $scope.next = function(){
    	$scope.query_param.start+=1;
    	$http({
            method: 'GET',
            url: services.lvye_activity,
            params: $scope.query_param
        }).success(function(data) {
            $scope.lvye_activities = data;
        });
    }
    $scope.go = function(lvye_activity) {
    	
        $scope.activity.title = lvye_activity.title;
        $scope.activity.startTime = lvye_activity.startTime;
        $scope.activity.endTime = lvye_activity.endTime;
        $scope.activity.fromCity = lvye_activity.fromLoc;
        $scope.activity.destinationCity = lvye_activity.toLoc;
        $scope.activity.destinationAddress = lvye_activity.scenic;
    }
}).directive('bDatepicker',
function() {

    return {
        restrict: 'A',
        require: "ngModel",
        link: function(scope, element, attr, ngModelCtrl) {
            element.datepicker({
                format: 'yyyy-mm-dd',
                weekStart: 1,
                autoclose: true,
                todayBtn: 'linked',
                language: 'zh-CN'

            }).on('changeDate',
            function(e) {
                // var outputDate = new Date(e.date);
                // var n = outputDate.getTime();
                console.log(e);
                ngModelCtrl.$setViewValue(e.currentTarget.value);
                scope.$apply();
            });
            var component = element.siblings('[data-toggle="datepicker"]');
            if (component.length) {
                component.on('click',
                function() {});
            }
        }
    };
}).directive('ngUploadForm', ['fileUpload',
function() {
    return {
        restrict: 'E',
        templateUrl: 'itravel/views/fileform.html',
        scope: {
            allowed: '@',
            url: '@',
            autoUpload: '@',
            sizeLimit: '@',
            ngModel: '=',
            name: '@',
        },

        controller: function($scope, $element, fileUpload) {
            $scope.$on('fileuploaddone',
            function(e, data) {
            	console.log(data._response.result.imageNames)
                $scope.$parent.activity.images.push(data._response.result.imageNames);
                console.log($scope.$parent.activity)
            });

            $scope.options = {
                url: $scope.url,
                dropZone: $element,
                maxFileSize: $scope.sizeLimit,
                autoUpload: $scope.autoUpload
            };
            $scope.loadingFiles = true;

            if (!$scope.queue) {
                $scope.queue = [];
            }

            var generateFileObject = function generateFileObjects(objects) {
                angular.forEach(objects,
                function(value, key) {
                    var fileObject = {
                        name: value.filename,
                        size: value.length,
                        url: value.url,
                        thumbnailUrl: value.url,
                        deleteUrl: value.url,
                        deleteType: 'DELETE',
                        result: value
                    };

                    if (fileObject.url && fileObject.url.charAt(0) !== '/') {
                        fileObject.url = '/' + fileObject.url;
                    }

                    if (fileObject.deleteUrl && fileObject.deleteUrl.charAt(0) !== '/') {
                        fileObject.deleteUrl = '/' + fileObject.deleteUrl;
                    }

                    if (fileObject.thumbnailUrl && fileObject.thumbnailUrl.charAt(0) !== '/') {
                        fileObject.thumbnailUrl = '/' + fileObject.thumbnailUrl;
                    }

                    $scope.queue[key] = fileObject;
                });
            };
            fileUpload.registerField($scope.name);
            $scope.filequeue = fileUpload.fieldData[$scope.name];

            $scope.$watchCollection('filequeue',
            function(newval) {
                generateFileObject(newval);
            });
        }
    };
}]).controller('FileDestroyController', ['$rootScope', '$scope', '$http', 'fileUpload',
function($rootScope, $scope, $http, fileUpload) {
    var file = $scope.file,
    state;

    if ($scope.$parent && $scope.$parent.$parent && $scope.$parent.$parent.$parent.name) {
        $scope.fieldname = $scope.$parent.$parent.$parent.name;
    }

    if (!fileUpload.fieldData[$scope.name]) {
        fileUpload.fieldData[$scope.name] = [];
    }

    $scope.filequeue = fileUpload.fieldData;

    if (file.url) {
        file.$state = function() {
            return state;
        };
        file.$destroy = function() {
            state = 'pending';
            return $http({
                url: file.deleteUrl,
                method: file.deleteType
            }).then(function() {
                state = 'resolved';
                fileUpload.removeFieldData($scope.fieldname, file.result._id);
                $scope.clear(file);
            },
            function() {
                state = 'rejected';
                fileUpload.removeFieldData($scope.fieldname, file.result._id);
                $scope.clear(file);
            });

        };
    } else if (!file.$cancel && !file._index) {
        file.$cancel = function() {
            $scope.clear(file);
        };
    }
}]);

adminModule.controller('TagCtrl',
function($scope, $http) {
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
    }

})

adminModule.config(['$routeProvider',
function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'itravel/views/activity_list.html',
        controller: 'ActivitiesCtrl'
    }).when('/tags', {
        templateUrl: 'itravel/views/tags_list.html',
        controller: 'TagCtrl'
    });

}]);

/*
 * adminModule.directive('bDatepicker', function () {
 * 
 * return { restrict: 'A', require: "ngModel", template:'<div>dfdfd</div>',
 * link: function (scope, element, attr,ngModelCtrl) { element.modal(); } }; });
 */
