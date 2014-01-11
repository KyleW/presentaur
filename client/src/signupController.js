// -- Form for signing up to present at a meeting.

app.controller('SignupController', function ($rootScope, $scope, $http, $location, $cookies, $cookieStore, sharedMethods) {
  $rootScope.id = $location.path().split('/')[2];
  $cookies.meetingId = $rootScope.id;
  delete $cookies.submit;
  $scope.speakers = [];

  $http({
    url: '/meeting/' + $rootScope.id,
    method: 'GET'
  })
  .success(function (data) {
    sharedMethods.updateMeeting(data[0]);
    $scope.meeting = data[0];
    if (data[0].speakers) {
      $scope.speakers = data[0].speakers;
    }
    $scope.meetingName = data[0].meetingName;
  })
  .error(function (data) {
    console.log('ERROR');
  });

  $scope.addPresenter = function () {
    $http({
      url: '/meeting/new',
      method: 'POST',
      data: sharedMethods.getMeeting()
    });

    $scope.speaker = {name: '', url: '', user_id: $rootScope.userid, userPic: $rootScope.userPic || '/res/bod.jpg'};
  };
  $scope.speaker = {
    name: '',
    url: '',
    user_id: $rootScope.userid,
    userPic: $rootScope.userPic || '/res/bod.jpg'
  };

  $scope.editing = false;
  $scope.edit = function () {
    $scope.editing = true;
  };
  $scope.saveEdit = function (speaker) {
    $scope.editing = false;
    var key = $scope.speakers.indexOf(speaker);

    $http({
      url: '/meeting/' + $rootScope.id,
      method: 'GET'
    })
    .success(function (data) {
      $scope.meeting = data[0];
      if (data[0].speakers) {
        $scope.speakers = data[0].speakers;
      }
      $scope.speakers[key] = speaker;

      sharedMethods.updateQueue($scope.speakers);
      $scope.addPresenter();
    })
    .error(function (data) {
      console.log('ERROR');
    });
  };
  $scope.save = function () {
    $http({
      url: '/meeting/' + $rootScope.id,
      method: 'GET'
    })
    .success(function (data) {
      $scope.meeting = data[0];
      if (data[0].speakers) {
        $scope.speakers = data[0].speakers;
      }
      $scope.speaker.name = $rootScope.username ? $scope.speaker.name = $rootScope.displayName : $scope.speaker.name;
      !$scope.speaker.name && ($scope.speaker.name = 'Anonymous');
      $scope.speakers.push($scope.speaker);

      sharedMethods.updateQueue($scope.speakers);
      $scope.addPresenter();
    })
    .error(function (data) {
      console.log('ERROR');
    });
  };
});