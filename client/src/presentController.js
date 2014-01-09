// -- Container page for slideshows to overlay presentaur functionality

app.controller('PresentController', function ($rootScope, $scope, $sce, $location, $http, $timeout, socket, sharedMethods) {
  $rootScope.id = $location.path().split('/')[2];
  var room = $rootScope.id;

  $http({
    url: '/meeting/' + $rootScope.id,
    method: 'GET'
  })
  .success(function (data) {
    sharedMethods.updateMeeting(data[0]);
    $scope.speakers = sharedMethods.getQueue();
    $scope.speaker = $scope.speakers[0];
    $scope.presentation = $sce.trustAsResourceUrl($scope.speaker.url);
    $scope.speakerName = $scope.speaker.name;
    $scope.current = data[0].current;
  })
  .error(function (data) {
    console.log('ERROR');
  });
  $scope.frameSize = 'windowed';
  $scope.transition = 'fadein';
  $scope.started = false;

  //socket.io stuff

  //Connects to room unique to meeting
  socket.on('connect', function (data) {
    socket.emit('presentation join', room);
  });

  socket.on('fade out', function () {
    $scope.current++;
    sharedMethods.updateCurrent($scope.current);
    if ($scope.current < $scope.speakers.length) {
      $scope.speaker = $scope.speakers[$scope.current];
      $scope.speakerName = $scope.speaker.name;
      $timeout(function () {
        $scope.presentation = $sce.trustAsResourceUrl($scope.speaker.url);
      }, 1000);
    } else {
      $scope.speakerName = '';
    }
    $scope.transition = 'fadeout';
  });

  socket.on('fade in', function () {
    $scope.transition = 'fadein';
  });

  socket.on('fullscreen', function () {
    $scope.frameSize = $scope.frameSize === 'windowed' ? 'fullscreen' : 'windowed';
    if (!$scope.started) {
      $scope.started = true;
      $scope.transition = 'fadeout';
    }
  });

  socket.on('start over', function () {
    $scope.current = 0;
    $scope.frameSize = 'windowed';
    $scope.transition = 'fadein';
    sharedMethods.updateCurrent(0);
    $scope.started = false;
    $scope.speaker = $scope.speakers[0];
    $scope.speakerName = $scope.speaker.name;
    $scope.presentation = $sce.trustAsResourceUrl($scope.speaker.url);
  });
});