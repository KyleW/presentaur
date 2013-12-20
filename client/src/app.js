var app = angular.module('myApp', ['ngRoute', 'btford.socket-io'])
.config(['$routeProvider', function ($routeProvider) {
  // all of these just append to <div ng-view> in index.html
  $routeProvider.when('/', {
    controller: 'LoginController',
    templateUrl: 'templates/login.html'
  }).when('/signup/:id', {
    controller: 'SignupController',
    templateUrl: 'templates/signup.html'
  }).when('/dj/:id', {
    controller: 'DjController',
    templateUrl: 'templates/dj.html'
  }).when('/present/:id', {
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