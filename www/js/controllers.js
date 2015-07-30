angular.module('starter.controllers', [])

.controller('RainCtrl', function($scope,Locations,$http, $location) {

	$scope.rain = {};
	$scope.secondDate = false;

	$scope.locations = {};
	Locations.getLocations("rain").then(function(data) { $scope.locations = data; $scope.locsel = $scope.locations["Location_0"].name; });

	$scope.toggleSecondDate = function() {
		$scope.secondDate = !$scope.secondDate;
		return $scope.secondDate; 
	};

        $scope.goGraph = function () {
            $location.path('/tab/rain/graph');
        }

	$scope.saveRecord = function() {
		var location = document.rainform.locationselect[document.rainform.locationselect.selectedIndex].value;
		console.log("Saving "+ $scope.rain.millimeters + " from " + $scope.fromDate + " to " + $scope.toDate + " for location " + location);
		var record = {};
		record.rain = $scope.rain.millimeters;
		record.fromdate = $scope.fromDate.toISOString();
		record.todate = $scope.toDate.toISOString();
		record.locationid = location;
		record.note = $scope.rain.note;
		$http.post('https://afrihost.sasscal.org/api/rain', record).success(function(response) {  $scope.errorLabel = response; }).error(function(response) {  $scope.errorLabel = response; });
	};

	$scope.setFromDate = function() {
		Locations.setLocation(document.rainform.locationselect[document.rainform.locationselect.selectedIndex].value);
		Locations.getFromDate("rain").then(function(dt) {
					var utc = dt.length < 10 ? new Date(new Date().getTime() - 86400000) : new Date(dt); 
					var local = utc.getTime() - (utc.getTimezoneOffset() * 60000);
					$scope.fromDate = new Date(local); 
				});
	};

	$scope.fromDate = new Date(new Date().getTime() - 86400000);
	$scope.toDate = new Date();
			$scope.toDate.setHours(8);
			$scope.toDate.setMinutes(30);
			$scope.toDate.setSeconds(0);
			$scope.toDate.setMilliseconds(0);
	$scope.titleFrom = "Start of Rainfall Measurement";
	$scope.titleTo = "End of Rainfall Measurement";

	$scope.fromDateCallback = function (val) {
    		if(typeof(val)!=='undefined'){      
			val.setHours(8);
			val.setMinutes(30);
			val.setSeconds(1);
			val.setMilliseconds(0);
			$scope.fromDate = val;
		}
	};

	$scope.toDateCallback = function (val) {
    		if(typeof(val)!=='undefined'){      
			val.setHours(8);
			val.setMinutes(30);
			val.setSeconds(0);
			val.setMilliseconds(0);
			$scope.toDate = val;
		}
	};
})

.controller('RainGraphCtrl', function($scope, Graph, Locations) {

	$scope.chart = {};
        $scope.chart.type = "bar";
	$scope.placeholder = "[Placeholder for Rain Chart]";
	$scope.graphdata = {};

        $scope.drawGraph = function() {
                var locid = Locations.getLocation();
		if (isNaN(locid)) {
			$scope.placeholder = "Please select a location";
		} else {
			console.log("Locations.getLocation() : "+Locations.getLocation());	
		}
	        Graph.getData("rain", 30, $scope.chart.type ,Locations.getLocation()).then(function(data) { 
					//$scope.graphdata = data; 
					console.log(JSON.stringify(data));
//var myData = new Array(["one", 20], ["two", 10], ["three", 30], ["four", 10], ["five", 5]);
					var myChart = new JSChart('rainchart', $scope.chart.type);
					//myChart.setDataJSON(JSON.stringify(data));
					myChart.setDataArray(data);
					myChart.draw();
				});
	}

        $scope.drawGraph();

	$scope.test = function() { $scope.drawGraph(); };
	
})

.controller('MintempCtrl', function($scope,Locations,$http) {

	$scope.mintemp = {};
	$scope.secondDate = false;

	$scope.locations = {};
	Locations.getLocations("mintemp").then(function(data) { $scope.locations = data; });

	$scope.toggleSecondDate = function() {
		$scope.secondDate = !$scope.secondDate;
		return $scope.secondDate; 
	};

	$scope.saveRecord = function() {
		var location = document.mintempform.locationselect[document.mintempform.locationselect.selectedIndex].value;
		console.log("Saving "+ $scope.mintemp.millimeters + " from " + $scope.fromDate + " to " + $scope.toDate + " for location " + location);
		var record = {};
		record.mintemp = $scope.mintemp.millimeters;
		record.fromdate = $scope.fromDate.toISOString();
		record.todate = $scope.toDate.toISOString();
		record.locationid = location;
		record.note = $scope.mintemp.note;
		$http.post('https://afrihost.sasscal.org/api/mintemp', record).success(function(response) {  $scope.errorLabel = response; }).error(function(response) {  $scope.errorLabel = response; });
	};

	$scope.setFromDate = function() {
		var location = document.mintempform.locationselect[document.mintempform.locationselect.selectedIndex].value;
		Locations.getFromDate(location, "mintemp").then(function(dt) {
					var utc = dt.length < 10 ? new Date(new Date().getTime() - 86400000) : new Date(dt); 
					var local = utc.getTime() - (utc.getTimezoneOffset() * 60000);
					$scope.fromDate = new Date(local); 
				});
	};

	$scope.fromDate = new Date(new Date().getTime() - 86400000);
	$scope.toDate = new Date();
			$scope.toDate.setHours(8);
			$scope.toDate.setMinutes(30);
			$scope.toDate.setSeconds(0);
			$scope.toDate.setMilliseconds(0);
	$scope.titleFrom = "Start of Rainfall Measurement";
	$scope.titleTo = "End of Rainfall Measurement";

	$scope.fromDateCallback = function (val) {
    		if(typeof(val)!=='undefined'){      
			val.setHours(8);
			val.setMinutes(30);
			val.setSeconds(1);
			val.setMilliseconds(0);
			$scope.fromDate = val;
		}
	};

	$scope.toDateCallback = function (val) {
    		if(typeof(val)!=='undefined'){      
			val.setHours(8);
			val.setMinutes(30);
			val.setSeconds(0);
			val.setMilliseconds(0);
			$scope.toDate = val;
		}
	};
})

.controller('AccountCtrl', function($http, $scope, $location) {

    $scope.addlocation = function () {
	$location.path('/tab/account/newlocation');
    }
	
    $scope.goHistory = function () {
	$location.path('/tab/account/history');
    }
	
    $scope.logout = function () {
        var requestHeaders = {
            url: "https://nonceackdidntlogin:bogusdidntlogin@afrihost.sasscal.org/api/locations",
            username:'aSDsWeCdvF1276734hghg345772jip42',
            password: 'qw1231erdfb56787m0fm403495mngf0bk34'
        };

        $http(requestHeaders)
                .success(function(response) {
                        console.log("Logged Out..");
                      })
                .error(function(response) {
			//here we can redirect to a logout screen
                        console.log("SOME ERRROR: "+response);
                      });
    }

})

.controller('NewlocationCtrl', function($http, $scope, $location) {
    $scope.location = {};

    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) { 
	  $scope.$apply(function() {
             $scope.location.latitude = position.coords.latitude;
             $scope.location.longitude = position.coords.longitude;
          })
       });
    }

        $scope.saveRecord = function() {
                var record = {};
                record.name = $scope.location.name;
                record.longitude = $scope.location.longitude;
                record.latitude = $scope.location.latitude;
                $http.post('https://afrihost.sasscal.org/api/locations', record).success(function(response) {  $scope.errorLabel = response; }).error(function(response) {  $scope.errorLabel = response; });
        };

})

.controller('HistoryCtrl', function(History, $scope, $http) {

	$scope.history = {};
        History.getLatest().then(function(data) { $scope.history = data; });

        $scope.removeItem = function(type, mid, key) {
                var req = {
                   method: 'DELETE',
                   url: 'https://afrihost.sasscal.org/api/'+type,
                   data: { id: mid }
                }
		$http(req).success(function(response) {  console.log(response);delete $scope.history[key] }).error(function(response) { alert(response) });
        };

});
