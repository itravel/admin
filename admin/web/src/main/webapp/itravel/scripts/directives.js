angular.module('admin')
.directive('ngUploadForm', ['fileUpload',
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
                $scope.ngModel.images.push(data._response.result.imageNames);
            });

            $scope.options = {
            	previewMaxWidth:200,
            	previewMaxHeight: 200,
            	previewCrop: true ,// Force cropped images
                url: $scope.url,
                dropZone: $element,
                maxFileSize: $scope.sizeLimit,
                autoUpload: false
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

            $scope.$watchCollection('filequeue',function(newval) {
                generateFileObject(newval);
            });
            $scope.remove = function(file){
            	angular.forEach($scope.queue,function(item,index){
            		$scope.queue.splice(index,1);
            	})
            }
            
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