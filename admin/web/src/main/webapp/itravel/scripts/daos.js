angular.module('admin')
    .factory('BaseHttp', ['$http', '$rootScope', function ($http, $rootScope) {
        return function(config){
            var httpPromise = $http(config);
            return httpPromise;
        }
    }])
;
/*-------------------绿野活动DAO---------------------------------*/
angular.module('admin')
.factory('LvyeActivityDao', ['BaseHttp','serviceUrl', function ($http,serviceUrl) {
    return {
        list: function () {
            return $http({
                method: 'GET',
                url: serviceUrl.lvye
            });
        },
        getUnedit:function(offset,num){
        	console.log(offset)
        	return $http({
                method: 'GET',
                url: serviceUrl.lvyeUnedit,
                params:{'start':offset,'num':num}
            });
        },
        
        get: function (id) {
            return $http({
                method: 'GET',
                url: serviceUrl.lvye+'/' + id
            });
        },
        saveEdit:function(data){
        	return $http({
                method: 'POST',
                url: serviceUrl.lvye+"/"+data.lvyeId,
                data: $.param(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    	
                }
            });
        }
    };
}])
;
/*-------------------活动标签DAO---------------------------------*/

angular.module('admin')
.factory('TagDao', ['BaseHttp','serviceUrl', function ($http,serviceUrl) {

    return {
        list: function () {
            return $http({
                method: 'GET',
                url: serviceUrl.tag
            });
        },
        get: function (id) {
            return $http({
                method: 'GET',
                url: serviceUrl.tag+'/' + id
            });
        }
    };
}])
;
angular.module('admin')
.factory('TagCategoryDao',  ['BaseHttp','serviceUrl', function ($http,serviceUrl) {

    return {
        list: function () {
            return $http({
                method: 'GET',
                url: serviceUrl.category
            });
        },
        get: function (id) {
            return $http({
                method: 'GET',
                url: serviceUrl.category+'/' + id
            });
        }
    };
}]);
/*-------------------活动DAO---------------------------------*/
angular.module('admin')
.factory('ActivityDao',  ['BaseHttp','serviceUrl', function ($http,serviceUrl) {

    return {
        list: function (offset,num) {
            return $http({
                method: 'GET',
                params:{'start':offset,'number':num},
                url: serviceUrl.activities
            });
        },
        get: function (id) {
            return $http({
                method: 'GET',
                url: serviceUrl.activities+'/' + id
            });
        },
        create:function(data){
        	return $http({
                method: 'POST',
                url: serviceUrl.activities,
                data: $.param(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    	
                }
            });
        },
        update:function(id,data){
        	return $http({
                method: 'PUT',
                url: serviceUrl.activities+"/"+id,
                data: $.param(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    	
                }
            });
        }
    };
}]);