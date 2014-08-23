angular.module('admin').factory('TagService',function($q,TagDao,TagCategoryDao,TagDO){
	var transform = function(fromData){
		var tags = {};
		angular.forEach(fromData,function(item){
			var tag = TagDO.getInstance();
			tag.id = item.id;
			tag.tag = item.tag;
			tag.selected = false;
			tags[""+tag.id] = tag;
		})
		return tags;
		
	};
	
	return {
		getAll:function() {
			var d = $q.defer();
			
            TagDao.list().success(function(data){
            	_tags = transform(data);
                d.resolve(_tags);
            }).error(function(data){
           	 
                d.reject(data);
            });

            return d.promise;
		}
		
	}
});