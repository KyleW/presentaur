app

// -- Splash page.  Will handle authentication for DJs.

.controller('SplashController', function ($rootScope, $scope, $http, $location, sharedMethods) {
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
      $location.url('/account/' + $rootScope.id);
    })
    .error(function (data) {
      console.log('ERROR! recieved:', data);
    });
  };
})


// -- Currently handles creation of new meetings.

.controller('NewController', function ($rootScope, $scope, $http, $location, sharedMethods) {
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
      $location.url('/account/' + $rootScope.id);
    })
    .error(function (data) {
      console.log('ERROR! recieved:', data);
    });
  };
})
// -- Gives you links to send out to speakers, access your dashboard, and view presentation
.controller('AccountController', function ($scope, sharedMethods) {
  $scope.meeting = sharedMethods.getMeeting();
})


// -- Form for signing up to present at a meeting.

.controller('SignupController', function ($rootScope, $scope, $http, $location, sharedMethods) {
  $rootScope.id = $location.path().split('/')[2];
  $http({
    url: '/meeting/' + $rootScope.id,
    method: 'GET'
  })
  .success(function (data) {
    sharedMethods.updateMeeting(data[0]);
    $scope.meeting = data[0];
    $scope.queue = data[0].speakers;
  })
  .error(function (data) {
    console.log('ERROR');
  });
  $scope.addPresenter = function () {
    $scope.queue.push({name: $scope.speaker.name, url:$scope.speaker.url});
    sharedMethods.updateQueue($scope.queue);
    $scope.meeting = sharedMethods.getMeeting();
    sharedMethods.updateMeeting($scope.meeting);

    $http({
      url: '/meeting/new',
      method: 'POST',
      data: sharedMethods.getMeeting()
    });

    $scope.speaker = {name: '', url: ''};
  };
  // -- this was an attempt to handle each speaker having an array of urls
  // $scope.addUrlSlot = function () {
  //   console.log($scope.speaker.url)
  //   if ($scope.speaker.url.indexOf('') === -1){
  //     $scope.speaker.url.push('');
  //   }
  // };
  $scope.speaker = {
    name: '',
    url: ''
  };
})


// -- Dashboard for DJing/MCing a meeting.

.controller('DjController', function ($rootScope, $scope, $http, $location, socket, sharedMethods) {
  $rootScope.id = $location.path().split('/')[2];
  $http({
    url: '/meeting/' + $rootScope.id,
    method: 'GET'
  })
  .success(function (data) {
    sharedMethods.updateMeeting(data[0]);
    $scope.queue = sharedMethods.getQueue();
  })
  .error(function (data) {
    console.log('ERROR');
  });
  $scope.remove = function (speaker) {
    $scope.queue.splice($scope.queue.indexOf(speaker), 1);
    sharedMethods.updateQueue($scope.queue);

    $http({
      url: '/meeting/new',
      method: 'POST',
      data: sharedMethods.getMeeting()
    });
  };
  $scope.moveSpeaker = function (speaker, direction) {
    var temp;
    var position = $scope.queue.indexOf(speaker);
    if (direction === 'up') {
      if (position > 0) {
        temp = $scope.queue[position-1];
        $scope.queue[position-1] = $scope.queue[position];
        $scope.queue[position] = temp;
      }
    } else {
      if (position < $scope.queue.length-1){
        temp = $scope.queue[position+1];
        $scope.queue[position+1] = $scope.queue[position];
        $scope.queue[position] = temp;
      }
    }
    sharedMethods.updateQueue($scope.queue);

    $http({
      url: '/meeting/new',
      method: 'POST',
      data: sharedMethods.getMeeting()
    });
  };
  $scope.fade = true;
  $scope.fadeout = function () {
    $scope.queue.shift();
    sharedMethods.updateQueue($scope.queue);
    socket.emit('fade out');
    $scope.fade = false;

    $http({
      url: '/meeting/new',
      method: 'POST',
      data: sharedMethods.getMeeting()
    });
  };
  $scope.fadein = function () {
    socket.emit('fade in');
    $scope.fade = true;
  };
  $scope.fullscreen = function () {
    console.log('fullscreen emitted');
    socket.emit('fullscreen');
  };
})


// -- Container page for slideshows to overlay presentaur functionality

.controller('PresentController', function ($rootScope, $scope, $sce, $location, $http, $timeout, socket, sharedMethods) {
  $rootScope.id = $location.path().split('/')[2];
  $http({
    url: '/meeting/' + $rootScope.id,
    method: 'GET'
  })
  .success(function (data) {
    sharedMethods.updateMeeting(data[0]);
    $scope.queue = sharedMethods.getQueue();
    $scope.speaker = $scope.queue[0];
    $scope.presentation = $sce.trustAsResourceUrl($scope.speaker.url);
    $scope.speakerName = $scope.speaker.name;
  })
  .error(function (data) {
    console.log('ERROR');
  });
  $scope.frameSize = 'windowed';
  $scope.transition = 'fadein';
  $scope.started = false;

  //socket.io stuff

  socket.on('fade out', function () {
    $scope.queue.shift();
    $scope.speaker = $scope.queue[0];
    $scope.speakerName = $scope.speaker.name;
    $timeout(function () {
      $scope.presentation = $sce.trustAsResourceUrl($scope.speaker.url);
    }, 1000);
    $scope.transition = 'fadeout';
  });

  socket.on('fade in', function () {
    $scope.transition = 'fadein';
  });

  socket.on('fullscreen', function () {
    $scope.frameSize = $scope.frameSize === 'windowed' ? 'fullscreen' : 'windowed';
  });
});