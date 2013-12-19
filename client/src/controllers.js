app.controller('LoginController', ['$scope', function ($scope) {
  $scope.name = 'Create New Meeting'
}])
.controller('SignupController', ['$scope', function ($scope, sharedProperties) {
  $scope.name = 'Sign Up For Meeting'
  $scope.presenters = [];
  $scope.addPresenter = function () {
    $scope.presenters.push();
  };
  $scope.speaker = {
    name: '',
    url: ''
  }
}])
.controller('DjController', ['$scope', function ($scope, sharedProperties) {
  $scope.name = 'DJ Dashboard';
  $scope.setPresenter = sharedProperties.setPresenter()
}])
.controller('PresentController', ['$scope', function ($scope, sharedProperties) {
  $scope.name = 'Presentation View';
  $scope.presenter = sharedProperties.getPresenter();
}])