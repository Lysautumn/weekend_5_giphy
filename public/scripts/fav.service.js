angular.module('giphyApp')
       .service('favService', FavService);

function FavService($http) {

  this.getFavorites = function() {
      return $http.get('/favorites').then(function(response) {
        return response.data;
      });
    };
  this.toSave = function() {
    return $http.post('/favorites').then(function(response) {
      return response.data;
    });
  };
}
