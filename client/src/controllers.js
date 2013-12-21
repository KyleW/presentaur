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
  console.log($scope.meeting);
})
// -- Form for signing up to present at a meeting.
.controller('SignupController', function ($scope, $http, $location, sharedMethods) {
  $scope.queue = sharedMethods.getQueue();
  $scope.meetingId = $location.path().split('/')[2];
  console.log($scope.meetingId);
  $http({
    url: '/meet/' + $scope.meetingId,
    method: 'GET'
  })
  .success(function (data) {
    console.log(data);
    sharedMethods.updateMeeting(data);
  })
  .error(function (data) {

  });
  $scope.addPresenter = function () {
    $scope.queue.push({name: $scope.speaker.name, url:$scope.speaker.url});
    sharedMethods.updateQueue($scope.queue);

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
.controller('DjController', function ($scope, sharedMethods) {
  $scope.queue = sharedMethods.getQueue();
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
})
// -- Container page for slideshows to overlay presentaur functionality
.controller('PresentController', function ($scope, sharedMethods) {
  $scope.queue = sharedMethods.getQueue();
  $scope.current = 0;
  $scope.presentation = $scope.queue[0];
});