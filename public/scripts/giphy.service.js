// finds existing module
angular.module('giphyApp').service('gifapi', GiphyAPIService);

// sets up http function and API variable
function GiphyAPIService($http) {
  var API = 'http://api.giphy.com/v1/gifs/';
  // function for getting random gif
  this.getRandom = function() {
    return $http.get(API + 'random?api_key=dc6zaTOxFJmzC').then(function(response) {
          return response.data.data.image_url;
        });
  };
  // function for searching for gifs
  this.getSpecific = function(search) {
    return $http.get(API + 'search?q=' + search + '&api_key=dc6zaTOxFJmzC').then(function(response) {
      return response.data.data;
    });
  };
}
