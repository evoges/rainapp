angular.module('starter.services', [])

.factory('Locations', function($http, $q) {

  var locationid;

  function getLocations(sortby) {
        var deferred = $q.defer();
        var requestHeaders = {
            url: "https://afrihost.sasscal.org/api/locations.json?measure="+sortby
        };

	$http(requestHeaders)
		.success(function(response) { 
                        deferred.resolve(response); 
                      })
		.error(function(response) { 
                        console.log("SOME ERRROR: "+response); 
                      });
	return deferred.promise;
  }

  function setLocation(locid) {
	locationid = locid;
  }

  function getLocation() {
	return locationid;
  }

  function getFromDate(measure) {
        var deferred = $q.defer();
        var requestHeaders = {
            url: "https://afrihost.sasscal.org/api/locations/"+locationid+"/latestdate.json?measure="+measure
        };

        $http(requestHeaders)
                .success(function(response) {
                        deferred.resolve(response);
                      })
                .error(function(response) {
                        console.log("SOME ERRROR: "+response);
                      });
        return deferred.promise;
  }

  function handleSuccess( response ) {
     return( response.data );
  }

  function handleError( response ) {
     if ( ! angular.isObject( response.data ) || ! response.data.message) {
         return( $q.reject( "An unknown error occurred." ) );
     }

     // Otherwise, use expected error message.
     return( $q.reject( response.data.message ) );

  }

  return {
    getLocations: getLocations,
    setLocation: setLocation,
    getLocation: getLocation,
    getFromDate: getFromDate
  };

})

.factory('Graph', function($http, $q) {

  function getData(mtype, mperiod, mgraph, locationid) {
        var deferred = $q.defer();
        var requestHeaders = {
            url: "https://afrihost.sasscal.org/api/locations/"+locationid+"/graph.json",
            params: { type: mtype, period: mperiod, graph: mgraph }
        };

        $http(requestHeaders)
                .success(function(response) {
	console.log("URL: "+requestHeaders.url);
                        deferred.resolve(response);
                      })
                .error(function(response) {
                        console.log("SOME ERRROR: "+response);
			console.log("URL: "+requestHeaders.url);
                      });
        return deferred.promise;
  }

  function handleSuccess( response ) {
     return( response.data );
  }

  function handleError( response ) {
     if ( ! angular.isObject( response.data ) || ! response.data.message) {
         return( $q.reject( "An unknown error occurred." ) );
     }

     // Otherwise, use expected error message.
     return( $q.reject( response.data.message ) );

  }

  return {
        getData : getData
  };
})

.factory('History', function($http, $q) {

  function getLatest() {
        var deferred = $q.defer();
        var requestHeaders = {
            url: "https://afrihost.sasscal.org/api/users/latestmeasurements.json?location=all"
        };

        $http(requestHeaders)
                .success(function(response) {
                        deferred.resolve(response);
                      })
                .error(function(response) {
                        console.log("SOME ERRROR: "+response);
                      });
        return deferred.promise;
  }

  function handleSuccess( response ) {
     return( response.data );
  }

  function handleError( response ) {
     if ( ! angular.isObject( response.data ) || ! response.data.message) {
         return( $q.reject( "An unknown error occurred." ) );
     }

     // Otherwise, use expected error message.
     return( $q.reject( response.data.message ) );

  }

  return {
	getLatest : getLatest
  };
});
