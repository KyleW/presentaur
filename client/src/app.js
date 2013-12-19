var app = angular.module('myApp', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    controller: 'LoginController',
    templateUrl: 'templates/login.html'
  }).when('/signup', {
    controller: 'SignupController',
    templateUrl: 'templates/signup.html'
  }).when('/dj', {
    controller: 'DjController'

  }).when('/present', {
    controller: 'PresentController'

  }).when('/404', {
    templateUrl: 'templates/404.html'
  })
  .otherwise({redirectTo: '/404'});
}])

app.run(function ($rootScope) {
  $rootScope.title = "Presentaur"
});