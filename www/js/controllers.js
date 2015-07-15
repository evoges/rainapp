angular.module('starter.controllers', [])

.controller('RainCtrl', function($scope,Locations) {

	$scope.secondDate = false;

	$scope.locations = {};
	Locations.getLocations().then(function(data) { $scope.locations = data});

	$scope.toggleSecondDate = function() {
		$scope.secondDate = !$scope.secondDate;
		return $scope.secondDate; 
	};

	$scope.fromDate = new Date();
	$scope.toDate = new Date();
	$scope.titleFrom = "Start of Rainfall Measurement";
	$scope.titleTo = "End of Rainfall Measurement";

	$scope.datePickerCallback = function (val) {
    	if(typeof(val)==='undefined'){      
        	console.log('Date not selected');
    	}else{
        	console.log('Selected date is : ', val);
    	}
	};
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
