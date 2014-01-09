// -- Form for signing up to present at a meeting.

app.controller('SignupController', function ($rootScope, $scope, $http, $location, $cookies, $cookieStore, sharedMethods) {
  $rootScope.id = $location.path().split('/')[2];
  $scope.speakers = [];

  $http({
    url: '/meeting/' + $rootScope.id,
    method: 'GET'
  })
  .success(function (data) {
    sharedMethods.updateMeeting(data[0]);
    $scope.meeting = data[0];
    if (data[0].speakers) {
      $scope.current = data[0].current;
      $scope.speakers = data[0].speakers;
      $scope.queue = $scope.speakers.slice($scope.current);
    }
    $scope.meetingName = data[0].meetingName;
  })
  .error(function (data) {
    console.log('ERROR');
  });

  $scope.addPresenter = function () {
    $scope.speakers.push({name: $scope.speaker.name, url:$scope.speaker.url, user_id: $rootScope.userid});
    sharedMethods.updateCurrent($scope.current);
    // $scope.meeting = sharedMethods.getMeeting();
    // sharedMethods.updateMeeting($scope.meeting);
    // what?

    $http({
      url: '/meeting/new',
      method: 'POST',
      data: sharedMethods.getMeeting()
    });

    $scope.speaker = {name: $rootScope.username || '', url: ''};
  };
  $scope.speaker = {
    name: $rootScope.username || '',
    url: ''
  };

  $scope.editing = false;
  $scope.edit = function () {
    $scope.editing = true;
  };
  $scope.save = function () {
    $scope.editing = false;

    $http({
      url: '/meeting/new',
      method: 'POST',
      data: sharedMethods.getMeeting()
    });
  };
});