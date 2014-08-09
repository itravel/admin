angular.module('admin').directive('ngActivityForm', ['AdminService', function(AdminService) {

	return {
		restrict : 'ACEM',
		templateUrl : 'itravel/views/activity-form.html',
		require : '^ngModel',
		scope : {
			ngModel : '=',
		},
		controller : function($scope, $element) {
			$scope.tags={};
			AdminService.getTags().then(function(data) {

				angular.forEach(data, function(value) {
					$scope.tags["'"+value.tag+"'"]={
							'id' : value.id,
							'tag' : value.tag,
							'selected' : 'false'
						}
				})
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
			
			$scope.$watchCollection('ngModel.images',function(){
				console.log("-----")
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
				console.debug(newActivity);
				AdminService.saveActivity1(newActivity);

			};
		}

	}

} ]);