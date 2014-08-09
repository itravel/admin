
angular.module('admin')
    .factory('AdminService', ['$q', 'LvyeActivityDao','ActivityDao','TagDao', function ($q, LvyeActivityDao,ActivityDao,TagDao) {

        return {

            getLvyeUnedit:function (current) {
                var d = $q.defer();

                LvyeActivityDao.getUnedit(current,1).success(function(data){
                    d.resolve(data);
                }).error(function(data){
                    d.reject(data);
                });

                return d.promise;
            },
            getTags:function(){
            	 var d = $q.defer();

            	 TagDao.list().success(function(data){
                     d.resolve(data);
                 }).error(function(data){
                     d.reject(data);
                 });

                 return d.promise;
            },
            saveActivity:function(activity){
            	var d = $q.defer();
            	LvyeActivityDao.saveEdit(activity).success(function(data){
            		alert("保存成功")
                    d.resolve(data);
                }).error(function(data){
                	alert(data)
                    d.reject(data);
                });

                return d.promise;
            	
            },
            saveActivity1:function(activity){
            	var d = $q.defer();
            	if(activity.id&&activity.id>0){
            		ActivityDao.update(activity.id,activity).success(function(data){
                		alert("save successfully")
                        d.resolve(data);
                    }).error(function(data){
                    	alert(data)
                        d.reject(data);
                    });
            	}
            	else {
            		ActivityDao.create(activity).success(function(data){
                		alert("save successfully")
                        d.resolve(data);
                    }).error(function(data){
                    	alert(data)
                        d.reject(data);
                    });
            	}

                return d.promise;
            },
            get: function (id) {
                var d = $q.defer();

                ActivityDao.get(id).success(function(data){
                    d.resolve(data);
                }).error(function(data){
                    d.reject(data);
                });
                return d.promise;
            },
            
            listActivity:function(start){
            	var d = $q.defer();

                ActivityDao.list(start,15).success(function(data){
                    d.resolve(data);
                }).error(function(data){
                    d.reject(data);
                });
                return d.promise;
            }
        };
    }])
;