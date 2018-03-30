var socket = require('socket.io-client')('http://mindcontroll.herokuapp.com');
const web = require('./web');
var spotifyTab, netflixTab, youtubeTabs = [], facebookTabs= [], webTabs = [];
var netflix = [], spotify = [], youtube = [], facebook = [], webLinks = [];

netflix.push('planet earth');
spotify.push('kamasi washington');

function Refresh() {
  console.log('spotify: ' + spotify);
  socket.emit('update list', {netflix: netflix, spotify: spotify, youtube: youtube, facebook: facebook, web: webLinks});
}

socket.on('connect', function(){
  Refresh();
  console.log('connected');
});

socket.on('refresh now', function(){
  Refresh();
  console.log('refreshing');
});

socket.on('delete', function (data) {
  console.log(data);
  switch (data.plat) {
    case 'netflix':
      console.log('deleting from netflix: ' + data.name);
      netflix.splice(netflix.indexOf(data.name), 1);
      break;
    case 'spotify':
      console.log('deleting from spotify: ' + data.name);
      spotify.splice(spotify.indexOf(data.name), 1);
      break;
    case 'netflix':
      console.log('deleting from spotify: ' + data.name);
      youtube.splice(youtube.indexOf(data.name), 1);
      break;
    case 'facebook':
      console.log('deleting from facebook: ' + data.name);
      facebook.splice(facebook.indexOf(data.name), 1);
      break;
    case 'web':
      console.log('deleting from web: ' + data.name);
      webLinks.splice(webLinks.indexOf(data.name), 1);
      break;
    default:
      break;
  }

  Refresh();
});

socket.on('new message', function functionName(data) {
  console.log('new message = ' + data);
  if(data.plat.includes('netflix')){
    netflix.push(data.msg);
    NetflixSearch(data.msg);
  }
  if(data.plat.includes('spotify')){
    spotify.push(data.msg);
    SoptifySearch(data.msg);
  }
  if(data.plat.includes('youtube')){
    youtube.push(data.msg);
    YoutubeSearch(data.msg);
  }
  if(data.plat.includes('facebook')){
    facebook.push(data.msg);
  }
  if(data.plat.includes('web')){
    webLinks.push(data.msg);
  }

  Refresh();
});

socket.on('disconnect', function(){
  console.log('disconnected');
});

socket.on('speed up now', function(){
  console.log('speed up');
});

socket.on('speed down now', function(){
  console.log('speed down');
});

socket.on('shuffle now', function(){
  console.log('shuffle');
});

socket.on('interupt now', function(data){
  console.log('interupt');
  if(spotifyTab){
    spotifyTab.quit();
  }
  if(netflixTab){
    netflixTab.quit();
  }
  if(youtubeTabs.length > 0){
    for (var i = 0; i < youtubeTabs.length; i++) {
      youtubeTabs[i].quit();
    }
  }
});

function SoptifySearch(artist) {
  if(spotifyTab){
    spotifyTab.quit();
  }
  spotifyTab = web.Spotify(artist);
}

function NetflixSearch(artist) {
  if(netflixTab){
    netflixTab.quit();
  }
  netflixTab = web.Netflix(artist);
}

function YoutubeSearch(page) {
  youtubeTabs.push(web.Youtube(page));
}
