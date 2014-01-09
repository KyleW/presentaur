// -- Currently handles creation of new meetings.

app.controller('NewController', function ($rootScope, $scope, $http, $location, $cookies, $cookieStore, sharedMethods) {
  if (!$rootScope.userid) {
    $location.url('/');
    return;
  }
  $cookieStore.put('userid', $rootScope.userid);
  $scope.meetingName = '';
  $scope.createMeeting = function () {
    $http({
      url: '/meeting/new',
      method: 'POST',
      data: {
        meetingName: $scope.meetingName
      }
    })
    .success(function (data) {
      $rootScope.id = data._id;
      sharedMethods.createMeeting($scope.meetingName, $rootScope.id);
      $scope.meetingName = '';
      $location.url('/dashboard/' + $rootScope.userid);
    })
    .error(function (data) {
      console.log('ERROR! recieved:', data);
    });
  };
});