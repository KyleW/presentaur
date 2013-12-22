app
// -- Splash page.  Will handle authentication for DJs.
// -- Currently handles creation of new meetings.
.controller('LoginController', function ($rootScope, $scope, $http, $location, sharedMethods) {
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

    $http({
      url: '/meeting/new',
      method: 'POST',
      data: $scope.meeting
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
.controller('DjController', function ($rootScope, $scope, $http, $location, sharedMethods) {
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
    $scope.queue = sharedMethods.getQueue();
  };
  $scope.updatePresentation = function () {
    // something about sockets.
  };
})
// -- Container page for slideshows to overlay presentaur functionality
.controller('PresentController', function ($rootScope, $scope, $sce, $location, $http, sharedMethods) {
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
  $scope.buttonMode = 'Enter Fullscreen'
  $scope.toggleFullscreen = function () {
    $scope.frameSize = $scope.frameSize === 'windowed' ? 'fullscreen' : 'windowed';
    $scope.buttonMode = $scope.buttonMode === 'Enter Fullscreen' ? 'Exit Fullscreen' : 'Enter Fullscreen';
  }
});