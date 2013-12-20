var app = angular.module('myApp', ['ngRoute', 'btford.socket-io'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    controller: 'LoginController',
    templateUrl: 'templates/login.html'
  }).when('/signup', {
    controller: 'SignupController',
    templateUrl: 'templates/signup.html'
  }).when('/dj', {
    controller: 'DjController',
    templateUrl: 'templates/dj.html'
  }).when('/present', {
    controller: 'PresentController',
    templateUrl: 'templates/present.html'
  }).when('/404', {
    templateUrl: 'templates/404.html'
  })
  .otherwise({redirectTo: '/404'});
}]);

app.run(function ($rootScope) {
  $rootScope.title = "Presentaur";
});