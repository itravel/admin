angular.module('admin').factory('ActivityDO', function() {
	return {
		getInstance : function() {
			return {
				"id" : 0,
				"gmt_create" : "",
				"gmt_modified" : "",
				"title" : "",
				"content" : "",
				"startTime" : "",
				"endTime" : "",
				"depart" : "",
				"destination" : "",
				"scenerySpot" : "",
				"images" : [],
				"contact" : "",
				"recommender" : "",
				"sponsor" : "",
				"tags" : [],
				"participationType" : 0,
				"scale" : 0,
				"fee" : 0,
				"popularity" : 0,
				"convenience" : 0,
				"originality" : 0,
				"web" : ""

			}
		}

	}

});

angular.module('admin').factory('TagDO', function() {
	return {
		getInstance : function() {
			return {
				"id" : 0,
				"tag":"",
				"selected" : false

			}
		}

	}

});
