angular.module('admin').directive('ngActivityForm', ['AdminService','TagService', 'ActivityService',
    function(AdminService,TagService,ActivityService) {
	
	return {
		restrict : 'ACEM',
		templateUrl : 'itravel/views/activity-form.html',
		require : '^ngModel',
		scope : {
			ngModel : '=',
			activity:'&',
			url:'=',
			editable:'=',
		},
		
		controller : function($scope, $element) {
			
			$scope.disabled = true;
			$scope.$watch('ngModel',function(newVal,oldVal,scope){
				if(newVal){
					scope.activity = newVal;
				}
				// 获取活动的TAG
				if($scope.TAGS){
					$scope.tags = angular.copy($scope.TAGS);
					if(scope.activity.tags){
						angular.forEach(scope.activity.tags,function(item){
							if($scope.tags[""+item]){
								$scope.tags[""+item].selected = true;
							}
						});
					}
				}
				else {
					TagService.getAll().then(function(data){
						$scope.TAGS=data;
						$scope.tags = angular.copy($scope.TAGS);
						if(scope.activity.tags){
							angular.forEach(scope.activity.tags,function(item){
								if($scope.tags[""+item]){
									$scope.tags[""+item].selected = true;
								}
							});
						}
					
					})
					
						
					
				}
				
			});
			$scope.isDisabled = function() {
				return !($scope.activity&&$scope.activity.editing===true);
			}
			$scope.$watchCollection('ngModel.images',function(){
			});
			$scope.clear = function() {
				$scope.ngModel = {};
			};
			// 保存到服务器
			$scope.save = function(activity) {
				
				var newActivity = angular.copy(activity);
				newActivity.images = activity.images.join(",");
				var selectedTags = [];
				angular.forEach($scope.tags, function(tag) {

					if (tag.selected === true) {
						selectedTags.push(tag.tag);
					}
				});

				newActivity.tags = selectedTags.join(",");
				ActivityService.save(newActivity).then(function(data){
					$scope.$emit("saveActivity",true);
					$scope.activity = data;
					$scope.message = {};
					$scope.message.success = true;
					$scope.message.fail = false;
					$scope.message.content = "保存成功"
					$element.find('#activityEditModal').modal("show");
				},function(data){
					$scope.message = {};
					$scope.message.success = false;
					$scope.message.fail = true;
					$scope.message.content = data;
					$scope.message.content = data;
					$element.find('#activityEditModal').modal("show");
				});
//				AdminService.saveActivity1(newActivity).then(function(data){
//					$scope.activity = data;
//					console.log($scope.activity);
//					
//				});

			};

			
		}

	}

} ]);