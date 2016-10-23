// connects giphy app module with MainController
angular.module('giphyApp').controller('MainController', MainController);
// function for MainController
function MainController(gifapi) {
  var main = this;
  console.log('MainController loaded');
  // sets up initialized main.gifs and gifsArray
  main.gifs = null;
  main.gifsArray = [];
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
  main.toSave = function(event) {
    event.preventDefault();
    var imgData = main.serialize();
    $http({
      url: '/favs',
      type: 'POST',
      data: imgData
    });
    main.find('input').val('');
  };
}
