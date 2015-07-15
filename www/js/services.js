angular.module('starter.services', [])

.factory('Locations', function($http, $q) {

  function getLocations( ) {
        var deferred = $q.defer();
        var requestHeaders = {
            url: "https://afrihost.sasscal.org/api/users/1/locations.json",
	    username:'erik@sas.co.na',
	    password: 'qwe123'
        };

	$http(requestHeaders)
		.success(function(response) { 
                        deferred.resolve(response); 
                        console.log("RESOLVED"); 
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
    getLocations: getLocations
  };

})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
