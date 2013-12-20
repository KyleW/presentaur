app.controller('LoginController', function ($scope, $http) {
  $scope.name = 'Create New Meeting'
  $scope.createMeeting = function () {
    // some post to server to get it in a database
  }
})
.controller('SignupController', function ($scope, sharedProperties) {
  $scope.name = 'Sign Up For Meeting'
  $scope.queue = sharedProperties.getQueue();
  $scope.addPresenter = function () {
    $scope.queue.push({name: $scope.speaker.name, url:$scope.speaker.url});
    sharedProperties.updateQueue($scope.queue);
  };
  $scope.speaker = {
    name: '',
    url: ''
  }
})
.controller('DjController', function ($scope, sharedProperties) {
  $scope.queue = sharedProperties.getQueue();
  $scope.name = 'DJ Dashboard';
  $scope.queuePresenter = function () {
    sharedProperties.queuePresenter();
  };
  $scope.remove = function (who) {
    sharedProperties.removePresenter(who);
  };
})
.controller('PresentController', function ($scope, sharedProperties) {
  $scope.name = 'Presentation View';
  $scope.queue = sharedProperties.getQueue();
  $scope.current = 0
  $scope.presentation = $scope.queue[0];
})