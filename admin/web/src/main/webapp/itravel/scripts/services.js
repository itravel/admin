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
                    d.resolve(data);
                }).error(function(data){
                    d.reject(data);
                });

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
            }
        };
    }])
;