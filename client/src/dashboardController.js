// -- Dashboard for managing user's meetings.

app.controller('DashboardController', function ($rootScope, $scope, $http, $location, $cookies, $cookieStore, socket, sharedMethods) {
  //console.log($location.path().split('/')[2], $rootScope.userid, $location.path().split('/')[2] === $rootScope.userid);
  if ($cookies.login !== '1' && $location.path().split('/')[2] !== $rootScope.userid) {
    $location.url('/');
    return;
  }
  delete $cookies.login;
  $rootScope.userid = $location.path().split('/')[2];
  $cookies.userid = escape(JSON.stringify($rootScope.userid));
  $rootScope.loggedIn = true;
  $http({
    url: '/user/' + $rootScope.userid,
    method: 'GET'
  })
  .success(function (data) {
    $rootScope.user = data[0];
    $rootScope.username = data[0].name.givenName;
  })
  .error(function (data) {
    console.log('ERROR');
    $location.url('/');
  });

  $scope.both = [];

  $scope.getUserMeetings = function () {
    $http({
      url: '/meeting/owner/' + $rootScope.userid,
      method: 'GET'
    })
    .success(function (data) {
      $scope.hosting = data;
    })
    .error(function (data) {
      console.log('ERROR');
    });

    $http({
      url: '/meeting/speaker/' + $rootScope.userid,
      method: 'GET'
    })
    .success(function (data) {
      $scope.speaking = data;
      for (var i = 0; i < $scope.speaking.length; i++) {
        for (var j = 0; j < $scope.hosting.length; j++) {
          if ($scope.hosting[j].owner_id === $scope.speaking[i].owner_id) {
            $scope.both.push($scope.speaking.splice(i, 1)[0]);
            $scope.hosting.splice(j, 1);
            i--;
            j--;
            break;
          }
        }
      }
    })
    .error(function (data) {
      console.log('ERROR');
    });
  };

  $scope.getUserMeetings();

  // the create new presentaur form
  $scope.meetingName = '';
  $scope.createMeeting = function () {
    $http({
      url: '/meeting/new',
      method: 'POST',
      data: {
        meetingName: $scope.meetingName,
        owner_id: $rootScope.userid
      }
    })
    .success(function (data) {
      $rootScope.id = data._id;
      sharedMethods.createMeeting($scope.meetingName, $rootScope.id);
      $scope.meetingName = '';

      $scope.getUserMeetings();
    })
    .error(function (data) {
      console.log('ERROR! recieved:', data);
    });
  };
});