app.controller('LoginController', ['$scope', function ($scope) {
  $scope.name = 'Create New Meeting'
}])
.controller('SignupController', ['$scope', function ($scope) {
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
.controller('DjController', ['$scope', function ($scope) {
  $scope.name = 'DJ Dashboard'
}])
.controller('PresentController', ['$scope', function ($scope) {
  $scope.name = 'Presentation View'
}])