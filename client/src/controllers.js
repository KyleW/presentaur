app.controller('LoginController', ['$scope', function ($scope) {
  $scope.name = 'Create New Meeting'
}])

app.controller('SubmitController', ['$scope', function ($scope) {
  $scope.name = 'Sign Up For Meeting'
}])

app.controller('DashboardController', ['$scope', function ($scope) {
  $scope.name = 'DJ Dashboard'
}])

app.controller('PresenterController', ['$scope', function ($scope) {
  $scope.name = 'Presentation View'
}])