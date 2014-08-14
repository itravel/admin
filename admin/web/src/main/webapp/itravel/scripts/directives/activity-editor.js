angular.module('admin').directive('ngActivityForm', ['AdminService', function(AdminService) {

	return {
		restrict : 'ACEM',
		templateUrl : 'itravel/views/activity-form.html',
		require : '^ngModel',
		scope : {
			ngModel : '=',
			activity:'&',
			url:'=',
			editable:'='
		},
		controller : function($scope, $element) {
			$scope.tags={};
			$scope.disabled = true;
			AdminService.getTags().then(function(data) {

				angular.forEach(data, function(value) {
					$scope.tags["'"+value.tag+"'"]={
							'id' : value.id,
							'tag' : value.tag,
							'selected' : 'false'
						}
				})
			});
			$scope.$watch('ngModel',function(newVal,oldVal,scope){
				if(newVal){
					scope.activity = newVal;
				}
			});
			$scope.$watch('ngModel.tags',function(newVal, oldVal, scope) {
				
				if(!newVal){
					return;
				}
				angular.forEach(newVal,function(value){
					if(scope.tags["'"+value+"'"]){
						scope.tags["'"+value+"'"].selected=true;
					}
					
					
				})
			});
			$scope.isDisabled = function() {
				return !($scope.activity.editing===true);
			}
			$scope.$watchCollection('ngModel.images',function(){
			});
			$scope.clear = function() {
				$scope.ngModel = {};
			};
			// 保存到服务器
			$scope.save = function(activity) {
				$scope.$emit("saveActivity",true);
				var newActivity = angular.copy(activity);

				newActivity.images = activity.images.join(",");
				var selectedTags = [];
				angular.forEach($scope.tags, function(tag) {

					if (tag.selected === true) {
						selectedTags.push(tag.tag);
					}
				});

				newActivity.tags = selectedTags.join(",");
				console.debug(newActivity);
				AdminService.saveActivity1(newActivity);

			};
		}

	}

} ]);