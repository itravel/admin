
angular.module('admin')
    .factory('AdminService', ['$q', 'ActivityDO','LvyeActivityDao','ActivityDao','TagDao','TagCategoryDao','DoubanActivityDao',
     function ($q,ActivityDO, LvyeActivityDao,ActivityDao,TagDao,TagCategoryDao,DoubanActivityDao) {

        return {
        	/* 绿野数据Service*/
            getLvyeUnedit:function (current) {
                var d = $q.defer();

                LvyeActivityDao.getUnedit(current,1).success(function(data){
                    d.resolve(data);
                }).error(function(data){
                    d.reject(data);
                });

                return d.promise;
            },
            startLvyeEdit:function(lvyeId,editor){
            	var d = $q.defer();
            	LvyeActivityDao.update({'id':lvyeId,'editor':editor,'status':1}).success(function(data){
                    d.resolve(data);
                }).error(function(data){
                	alert(data)
                    d.reject(data);
                });

                return d.promise;
            	
            },
            cancelLvyeEdit:function(lvyeId,editor){
            	var d = $q.defer();
            	LvyeActivityDao.update({'id':lvyeId,'editor':editor,'status':0}).success(function(data){
                    d.resolve(data);
                }).error(function(data){
                	alert(data)
                    d.reject(data);
                });

                return d.promise;

            },
            completeLvyeEdit:function(lvyeId,editor){
            	var d = $q.defer();
            	LvyeActivityDao.update({'id':lvyeId,'editor':editor,'status':4}).success(function(data){
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
            /*******************活动数据服务*************************/
            createActivityDO:function(){
            	return angular.copy(ActivityDO);
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
            },
            /*******************标签数据服务*************************/
            getTags:function(){
           	 var d = $q.defer();

           	 TagDao.list().success(function(data){
                    d.resolve(data);
                }).error(function(data){
                    d.reject(data);
                });

                return d.promise;
           },
            deleteTagCategory:function(tagCategory){
            	var d = $q.defer();

            	TagCategoryDao.remove(tagCategory.id).success(function(data){
                    d.resolve(data);
                }).error(function(data){
                    d.reject(data);
                });
                return d.promise;
            },
            deleteTag:function(tag){
            	var d = $q.defer();

            	TagDao.remove(tag.id).success(function(data){
                    d.resolve(data);
                }).error(function(data){
                    d.reject(data);
                });
                return d.promise;
            },
            /*******************豆瓣数据服务*************************/
            getDoubanUnedit:function (current) {
                var d = $q.defer();

                DoubanActivityDao.getUnedit(current,1).success(function(data){
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

            }
        };
    }])
;