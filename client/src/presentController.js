// -- Container page for slideshows to overlay presentaur functionality

app.controller('PresentController', function ($rootScope, $scope, $sce, $location, $http, $cookies, $timeout, $interval, socket, sharedMethods) {
  $rootScope.id = $location.path().split('/')[2];
  var room = $rootScope.id;

  $http({
    url: '/meeting/' + $rootScope.id,
    method: 'GET'
  })
  .success(function (data) {
    sharedMethods.updateMeeting(data[0]);
    $scope.meeting = data[0];
    $scope.startTime = data[0].startTime;
    $scope.endTime = data[0].endTime;
    $scope.date = data[0].date;
    $scope.speakers = sharedMethods.getQueue();
    $scope.speaker = $scope.speakers[0];
    $scope.speakerPic = $scope.speaker.userPic;
    $scope.presentation = $sce.trustAsResourceUrl($scope.speaker.url);
    $scope.speakerName = $scope.speaker.name;
    $scope.meetingName = data[0].meetingName;
    $scope.countdown();
  })
  .error(function (data) {
    console.log('ERROR');
  });
  $scope.transition = 'fadeout';
  $scope.started = false;
  $scope.rehearsal = false;
  $scope.current = 0;

  //socket.io stuff

  //Connects to room unique to meeting
  socket.on('connect', function (data) {
    socket.emit('presentation join', room);
  });

  socket.on('fade out', function () {
    $scope.current++;
    if ($scope.current < $scope.speakers.length) {
      $scope.speaker = $scope.speakers[$scope.current];
      $scope.speakerName = $scope.speaker.name;
      $scope.speakerPic = $scope.speaker.userPic;
      $timeout(function () {
        $scope.presentation = $sce.trustAsResourceUrl($scope.speaker.url);
      }, 1000);
    } else {
      $scope.speakerName = '';
      $scope.started = false;
    }
    $scope.transition = 'fadeout';
  });

  socket.on('fade in', function () {
    $scope.transition = 'fadein';
  });

  socket.on('begin', function () {
    $scope.started = true;
    $scope.transition = 'fadeout';
  });

  socket.on('rehearse', function () {
    $scope.started = true;
    $scope.rehearsal = true;
    $scope.transition = 'fadeout';
  });

  socket.on('start over', function () {
    $scope.current = 0;
    $scope.transition = 'fadeout';
    $scope.started = false;
    $scope.rehearsal = false;
    $scope.speaker = $scope.speakers[0];
    $scope.speakerName = $scope.speaker.name;
    $scope.speakerPic = $scope.speaker.userPic;
    $scope.presentation = $sce.trustAsResourceUrl($scope.speaker.url);
  });

  $scope.timeRemaining = '';
  $scope.countdown = function () {
    // for displaying time remaining for meeting/per speaker
    var end = new Date($scope.date + ' ' + $scope.endTime);
    $interval(function () {
      var now = new Date();
      var seconds = end.getSeconds() - now.getSeconds() + 60;
      var minutes = end.getMinutes() - now.getMinutes();
      var hours = end.getHours() - now.getHours();
      $scope.timeRemaining = hours + ':' + ('0' + minutes).substr(-2) + ':' + ('0' + seconds).substr(-2);
      console.log($scope.timeRemaining);
    }, 1000); // ...ish
  };
});