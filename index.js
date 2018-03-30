var socket = require('socket.io-client')('http://mindcontroll.herokuapp.com');
const web = require('./web');
var spotifyTab;

socket.on('connect', function () {
  console.log('connected to socket');
});

socket.on('new message', function (data) {
   SoptifySearch(data.msg);
});

function SoptifySearch(artist) {
  if(spotifyTab){
    spotifyTab.quit();

  }
  spotifyTab = web.Spotify(artist);
}

// tabs.push(web.Spotify('Kamasi washington'));
//
// setTimeout(function () {
//   tabs.push(web.Netflix('planet earth'));
// }, 100);
//
// setTimeout(function () {
//   for (var i = 0; i < tabs.length ; i++){
//     console.log('closing TABS');
//     tabs[i].quit();
//   }
// }, 10000);
