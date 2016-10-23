angular.module('giphyApp')
    .config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'views/index.html',
            controller: 'MainController as main'
          }).when('/favorite', {
            templateUrl: 'views/favs.html',
            controller: 'DBController as db'
          });
        $locationProvider.html5Mode(true);
      });
      
