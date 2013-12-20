app
// -- Splash page.  Will handle authentication for DJs.
.controller('LoginController', function ($scope, $http) {
  $scope.name = 'Create New Meeting';
  $scope.meetingName = '';
  $scope.createMeeting = function () {
    $http({method: 'POST', meetingName: $scope.meetingName})
    .success(function (data) {
      $scope.meetingName = '';
      console.log('SUCCESS: recieved', data);
    })
    .error(function (data) {
      console.log('ERROR: recieved', data);
    });
  };
})
// -- Form for signing up to present at a meeting.
.controller('SignupController', function ($scope, sharedProperties) {
  $scope.name = 'Sign Up For Meeting';
  $scope.queue = sharedProperties.getQueue();
  $scope.addPresenter = function () {
    $scope.queue.push({name: $scope.speaker.name, url:$scope.speaker.url});
    sharedProperties.updateQueue($scope.queue);
    $scope.speaker = {name: '', url: ''};
  };
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
.controller('DjController', function ($scope, sharedProperties) {
  $scope.queue = sharedProperties.getQueue();
  $scope.name = 'DJ Dashboard';
  $scope.remove = function (speaker) {
    $scope.queue.splice($scope.queue.indexOf(speaker), 1);
    sharedProperties.updateQueue($scope.queue);
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
    sharedProperties.updateQueue($scope.queue);
    $scope.queue = sharedProperties.getQueue();
  };
})
// -- 
.controller('PresentController', function ($scope, sharedProperties) {
  $scope.name = 'Presentation View';
  $scope.queue = sharedProperties.getQueue();
  $scope.current = 0
  $scope.presentation = $scope.queue[0];
});