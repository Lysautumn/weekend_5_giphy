angular.module('giphyApp')
    .config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'views/index.html',
            controller: 'MainController as main'
          }).when('/favorites', {
            templateUrl: 'views/favs.html',
            controller: 'DBController as db'
          }).otherwise({
            redirectTo: '/home'
          });
        $locationProvider.html5Mode(true);
      });
