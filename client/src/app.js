var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'btford.socket-io'])

.config(['$routeProvider', function ($routeProvider) {
  // all of these just append to <div ng-view> in index.html
  $routeProvider.when('/', {
    templateUrl: 'templates/splash.html'
  }).when('/signup/:id', {
    controller: 'SignupController',
    templateUrl: 'templates/signup.html'
  }).when('/dj/:id', {
    controller: 'DjController',
    templateUrl: 'templates/dj.html'
  }).when('/dashboard/:userid', {
    controller: 'DashboardController',
    templateUrl: 'templates/dashboard.html'
  }).when('/present/:id', {
    controller: 'PresentController',
    templateUrl: 'templates/present.html'
  }).when('/newUser', {
    templateUrl: 'templates/createUser.html'
  })
  .otherwise({redirectTo: '/'});
}])

.run(function ($rootScope, $cookies, $cookieStore, $http, $location) {
  $rootScope.id = '';
  $rootScope.userid = $cookies.userid || null;
  $rootScope.loggedIn = false;
  if ($cookies.userid) {
    $rootScope.loggedIn = true;
  }
  if ($cookies.userid) {
    $rootScope.userid = $rootScope.userid;
    $http({
      url: '/user/' + $rootScope.userid,
      method: 'GET'
    })
    .success(function (data) {
      $rootScope.user = data[0];
      $rootScope.username = data[0].name.givenName;
    })
    .error(function (data) {
      console.log('ERROR');
      $rootScope.logout();
    });
  }
  $rootScope.login = function (submit) {
    submit && ($cookies.submit = $rootScope.id);
    console.log($cookies.submit);
    $cookies.login = '1';
  };
  $rootScope.logout = function () {
    delete $cookies.userid;
    delete $cookies.meetingId;
    $rootScope.loggedIn = false;
    $location.url('/');
    $rootScope.userid = '';
    $rootScope.username = '';
  };
});