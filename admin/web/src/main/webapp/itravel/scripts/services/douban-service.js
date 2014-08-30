angular.module('admin').factory('DoubanService',function($q,DoubanActivityDao,ActivityDO){
	 /*******************豆瓣数据服务*************************/
	return {
	    getUneditData:function (current) {
	        var d = $q.defer();
	
	        DoubanActivityDao.getUnedit(current,1).success(function(data){
	            d.resolve(data);
	        }).error(function(data){
	            d.reject(data);
	        });
	
	        return d.promise;
	    },
	    getUneditDataPage: function(current,number){
	    	var d = $q.defer();
	    	
	        DoubanActivityDao.getUnedit(current,number).success(function(data){
	            d.resolve(data);
	        }).error(function(data){
	            d.reject(data);
	        });
	
	        return d.promise;
	    },
	    startDoubanEdit:function(doubanId,editor){
	    	var d = $q.defer();
	    	DoubanActivityDao.update({'id':doubanId,'editor':editor,'status':1}).success(function(data){
	            d.resolve(data);
	        }).error(function(data){
	        	alert(data)
	            d.reject(data);
	        });
	
	        return d.promise;
	    	
	    },
	    cancelDoubanEdit:function(doubanId,editor){
	    	var d = $q.defer();
	    	DoubanActivityDao.update({'id':doubanId,'editor':editor,'status':0}).success(function(data){
	            d.resolve(data);
	        }).error(function(data){
	        	alert(data)
	            d.reject(data);
	        });
	
	        return d.promise;
	
	    },
	    completeEdit:function(doubanId,editor){
	    	var d = $q.defer();
	    	DoubanActivityDao.update({'id':doubanId,'editor':editor,'status':4}).success(function(data){
	            d.resolve(data);
	        }).error(function(data){
	        	alert(data)
	            d.reject(data);
	        });
	
	        return d.promise;
	    }
	};
});