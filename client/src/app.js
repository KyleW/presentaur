var app = angular.module('myApp', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    controller: 'LoginController',
    templateUrl: 'templates/login.html'
  }).when('/signup', {
    controller: 'LoginController'

  }).when('/dj', {
    controller: 'LoginController'

  }).when('/present', {
    controller: 'LoginController'

  }).when('/404', {
    templateUrl: 'templates/404.html'
  })
  .otherwise({redirectTo: '/404'});
}])

app.run(function ($rootScope) {
  $rootScope.title = "Presentaur"
})