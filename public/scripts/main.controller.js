// connects giphy app module with MainController
angular.module('giphyApp').controller('MainController', MainController);
// function for MainController
function MainController(gifapi, $http) {
  var main = this;

  console.log('MainController loaded');
  // sets up initialized main.gifs and gifsArray
  main.gifs = null;
  main.gifsArray = [];
  main.description = '';
  main.favsCounter = 0;
  main.favs = null;

  // function that connects to random button
  main.forRandom = function() {
    gifapi.getRandom().then(function(gifs) {
      main.gifs = [];
      main.gifs = gifs;
    });
  };
  // function that connects to search button
  main.forSearch = function() {
    gifapi.getSpecific(main.searchin).then(function(gif) {
      main.gifsArray = gif;
    });
  };
  main.toSave = function(description, url) {
    main.favs = {
      'description': main.saveImg,
      'url': main.src,
    };
    gifapi.toSave(main.favs).then(function(response) {
      console.log('response', response);
    });
  };
}
