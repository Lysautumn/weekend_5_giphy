// connects giphy app module with MainController
angular.module('giphyApp').controller('MainController', MainController);
// angular.module('giphyApp').controller('DBController', DBController);

// function for MainController
function MainController(gifapi, favService) {
  var main = this;

  console.log('MainController loaded');
  // sets up initialized main.gifs and gifsArray
  main.gifs = null;
  main.gifsArray = [];
  main.description = '';
  main.favsCounter = 0;
  main.favs = null;
  main.favsArray = [];

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
    main.search = '';
  };
  main.toSave = function() {

    var data = $.param({
      description: main.saveImg,
      url: main.url
    });
    console.log('description', main.saveImg);
    console.log('url', main.url);
    favService.toSave(data);
  };
  main.getFavs = function() {
    favService.getFavorites().then(function(response) {
      main.favsArray = response;
    });
  };
}
