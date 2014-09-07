angular.module('admin').factory('ActivityService',function($q,ActivityDao,ActivityDO){
	 /*******************线上活动服务*************************/
	return {
	    getUneditData:function (current) {
	        var d = $q.defer();
	
	        ActivityDao.getUnedit(current,1).success(function(data){
	            d.resolve(data);
	        }).error(function(data){
	            d.reject(data);
	        });
	
	        return d.promise;
	    },
	    get:function(id){
	    	var d = $q.defer();
	    	
	        ActivityDao.get(id).success(function(data){
	            d.resolve(data);
	        }).error(function(data){
	            d.reject(data);
	        });
	
	        return d.promise;
	    },
	    getUneditDataPage: function(current,number){
	    	var d = $q.defer();
	    	
	    	ActivityDao.getUnedit(current,number).success(function(data){
	            d.resolve(data);
	        }).error(function(data){
	            d.reject(data);
	        });
	
	        return d.promise;
	    },
	    startEdit:function(doubanId,editor){
	    	var d = $q.defer();
	    	ActivityDao.update({'id':doubanId,'editor':editor,'status':1}).success(function(data){
	            d.resolve(data);
	        }).error(function(data){
	        	alert(data)
	            d.reject(data);
	        });
	
	        return d.promise;
	    	
	    },
	    cancelEdit:function(doubanId,editor){
	    	var d = $q.defer();
	    	ActivityDao.update({'id':doubanId,'editor':editor,'status':0}).success(function(data){
	            d.resolve(data);
	        }).error(function(data){
	        	alert(data)
	            d.reject(data);
	        });
	
	        return d.promise;
	
	    },
	    save:function(activity){
	    	var d = $q.defer();
        	if(activity.id&&activity.id>0){
        		ActivityDao.update(activity.id,activity).success(function(data){
                    d.resolve(data);
                }).error(function(data){
                    d.reject(data);
                });
        	}
        	else {
        		ActivityDao.create(activity).success(function(data){
                    d.resolve(data);
                }).error(function(data){
                    d.reject(data);
                });
        	}

            return d.promise;
	    }
	};
});