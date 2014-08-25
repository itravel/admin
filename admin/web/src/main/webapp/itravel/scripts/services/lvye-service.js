angular.module('admin').factory('LvyeService',function($q,LvyeActivityDao,ActivityDO){
	
	var transform = function(lvyeActivity){
		transformed = ActivityDO.getInstance()
		transformed.title = lvyeActivity.title;
        transformed.startTime = lvyeActivity.startTime;
        transformed.endTime = lvyeActivity.endTime;
        transformed.depart= lvyeActivity.fromAddress;
        transformed.destination = lvyeActivity.destinationAddress;
        transformed.scenerySpot = lvyeActivity.scenic.split(" ").join(",");
        transformed.lvyeId = lvyeActivity.id;
        transformed.web = lvyeActivity.url;
        transformed.content = lvyeActivity.content;
        transformed.editing=false;
        return transformed;
	}
	return {
		transform:function(lvyeActivity){
			return transform(lvyeActivity);
		},
		getUneditData:function(start){
			 var d = $q.defer();

             LvyeActivityDao.getUnedit(start,1).success(function(data){
            	 var activity = transform(data[0]);
                 d.resolve(activity);
             }).error(function(data){
            	 
                 d.reject(data);
             });

             return d.promise;
		},
		getUneditDataPage:function(start,num){
			var d = $q.defer();
            LvyeActivityDao.getUnedit(start,num).success(function(data){
                d.resolve(data);
            }).error(function(data){
                d.reject(data);
            });
            return d.promise;
		},
		doEdit:function(id,editor){
			var d = $q.defer();
        	LvyeActivityDao.update({'id':id,'editor':editor,'status':1}).success(function(data){
                d.resolve(data);
            }).error(function(data){
            	alert(data)
                d.reject(data);
            });

            return d.promise;
		},
		cancelEdit:function(id,editor){
			var d = $q.defer();
        	LvyeActivityDao.update({'id':id,'editor':editor,'status':0}).success(function(data){
                d.resolve(data);
            }).error(function(data){
            	alert(data)
                d.reject(data);
            });

            return d.promise;
		},
		completedEdit:function(id,editor){
			var d = $q.defer();
        	LvyeActivityDao.update({'id':id,'editor':editor,'status':4}).success(function(data){
                d.resolve(data);
            }).error(function(data){
            	alert(data)
                d.reject(data);
            });

            return d.promise;
		}
	}
})