var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'btford.socket-io'])

.config(['$routeProvider', function ($routeProvider) {
  // all of these just append to <div ng-view> in index.html
  $routeProvider.when('/', {
    controller: 'SplashController',
    templateUrl: 'templates/splash.html'
  }).when('/new', {
    controller: 'NewController',
    templateUrl: 'templates/new.html'
  })
  // -- DEPRECATED.
  // .when('/account/:id', {
  //   controller: 'AccountController',
  //   templateUrl: 'templates/account.html'
  // })
  .when('/signup/:id', {
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
  }).when('/404', {
    templateUrl: 'templates/404.html'
  }).when('/newUser', {
    templateUrl: 'templates/createUser.html'
  })
  .otherwise({redirectTo: '/new'});
}])

.run(function ($rootScope, $cookies, $cookieStore, $http) {
  $rootScope.id = '';
  $rootScope.userid = $cookieStore.get('userid') || '';
  $rootScope.loggedIn = false;
  if (!!$rootScope.userid) {
    $http({
      url: '/user/' + $rootScope.userid,
      method: 'GET'
    })
    .success(function (data) {
      console.log(data);
      $rootScope.user = data;
      $rootScope.username = data.name;
    })
    .error(function (data) {
      console.log('ERROR');
    });
  } else {

    console.log('Already logged in as', $rootScope.username);
  }
});