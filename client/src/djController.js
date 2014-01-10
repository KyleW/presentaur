// -- Controller for DJing/MCing a meeting.

app.controller('DjController', function ($rootScope, $scope, $http, $location, $cookies, $cookieStore, socket, sharedMethods) {
  $rootScope.id = $location.path().split('/')[2];
  var room = $rootScope.id;

  if (!$cookies.userid) {
    $location.url('/');
    return;
  }
  $rootScope.loggedIn = true;

  $http({
    url: '/meeting/' + $rootScope.id,
    method: 'GET'
  })
  .success(function (data) {
    sharedMethods.updateMeeting(data[0]);
    $scope.meeting = data[0];
    $scope.speakers = data[0].speakers;
    $scope.queue = $scope.speakers.slice($scope.current);
    $scope.meetingName = data[0].meetingName;
  })
  .error(function (data) {
    console.log('ERROR');
  });
  $scope.current = 0;

  //Socket info to connect to room unique to presentation
  socket.on('connect', function (data) {
    socket.emit('dj join', room);
  });


  $scope.remove = function (speaker) {
    $scope.speakers.splice($scope.speakers.indexOf(speaker), 1);
    sharedMethods.updateQueue($scope.speakers);
    $scope.queue = $scope.speakers.slice($scope.current);

    $http({
      url: '/meeting/new',
      method: 'POST',
      data: sharedMethods.getMeeting()
    });
  };
  $scope.moveSpeaker = function (speaker, direction) {
    var temp;
    var position = $scope.speakers.indexOf(speaker);
    if (direction === 'up') {
      if (position > 0) {
        temp = $scope.speakers[position-1];
        $scope.speakers[position-1] = $scope.speakers[position];
        $scope.speakers[position] = temp;
      }
    } else {
      if (position < $scope.speakers.length-1){
        temp = $scope.speakers[position+1];
        $scope.speakers[position+1] = $scope.speakers[position];
        $scope.speakers[position] = temp;
      }
    }
    sharedMethods.updateQueue($scope.speakers);
    $scope.queue = $scope.speakers.slice($scope.current);

    $http({
      url: '/meeting/new',
      method: 'POST',
      data: sharedMethods.getMeeting()
    });
  };
  $scope.fade = true;
  $scope.started = false;

  $scope.fadeout = function () {
    $scope.current++;
    $scope.queue = $scope.speakers.slice($scope.current);
    socket.emit('fade out');
    $scope.fade = false;
  };
  $scope.fadein = function () {
    if ($scope.current < $scope.speakers.length) {
      socket.emit('fade in');
      $scope.fade = true;
    }
  };
  $scope.begin = function () {
    $scope.fade = false;
    $scope.started = true;
    socket.emit('begin');
  };
  $scope.rehearse = function () {
    $scope.fade = false;
    $scope.started = true;
    socket.emit('rehearse');
  };
  $scope.startOver = function () {
    $scope.current = 0;
    $scope.fade = true;
    $scope.started = false;
    $scope.queue = $scope.speakers;
    socket.emit('start over');

    $http({
      url: '/meeting/new',
      method: 'POST',
      data: sharedMethods.getMeeting()
    });
  };
});