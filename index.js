const perlin = require('perlin-noise');
var socket = require('socket.io-client')('http://mindcontroll.herokuapp.com');
const web = require('./web');
var spotifyTab, netflixTab, youtubeTabs = [], facebookTabs= [], webTabs = [];
var netflix = [], spotify = [], youtube = [], facebook = [], webLinks = [];
var score = perlin.generatePerlinNoise(1, 1000);
var scoreIndex = 0;
const fs = require('fs');
var bpm = 12;
var beat = 60000/bpm;
// netflix.push('planet earth');
// netflix.push('kamasi washington');
GetData();

setTimeout(function () {
  console.log(youtube);
  console.log(spotify);
  console.log(netflix);
  nextInScore(2);
}, 5000);

function GetData(srcPath, object) {
  fs.readFile('./Youtube.json', 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        console.log('file read');
        if(data){
           youtube = JSON.parse(data);
        }
    });
    fs.readFile('./Web.json', 'utf8', function (err, data) {
          if (err) {
            return console.log(err);
          }
          console.log('file read');
          if(data){
             webLinks = JSON.parse(data);
          }
      });
      fs.readFile('./Spotify.json', 'utf8', function (err, data) {
            if (err) {
              return console.log(err);
            }
            console.log('file read');
            if(data){
               spotify = JSON.parse(data);
            }
        });
        fs.readFile('./Netflix.json', 'utf8', function (err, data) {
              if (err) {
                return console.log(err);
              }
              console.log('file read');
              if(data){
                 netflix = JSON.parse(data);
              }
          });
}

function Quit() {
  fs.writeFile("./Youtube.json", JSON.stringify(netflix), 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
}


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
  clearAll();
});

function clearAll(){
  if(spotifyTab){
    spotifyTab.quit();
    spotifyTab = false;
  }
  if(netflixTab){
    netflixTab.quit();
    netflixTab = false;
  }
  if(youtubeTabs.length > 0){
    for (var i = 0; i < youtubeTabs.length; i++) {
      youtubeTabs[i].quit();
      youtubeTabs[i] = false;
    }
  }
}

function SpotifySearch(artist) {
  if(spotifyTab){
    spotifyTab.quit();
  }
  spotifyTab = web.Spotify(artist);
}

function NetflixSearch(artist) {
  if(netflixTab){
    web.NewNetflix(netflixTab, artist);
  } else {
    netflixTab = web.Netflix(artist);
  }
}

function YoutubeSearch(page) {
  youtubeTabs.push(web.Youtube(page));
}

function ClearYoutube(page) {
  if(youtubeTabs.length > 0){
    for (var i = 0; i < youtubeTabs.length; i++) {
      youtubeTabs[i].quit();
    }
    youtubeTabs = [];
  }
}

function YoutubeBeat(i) {
  if (youtubeTabs.length >= 4) {
    youtubeTabs[0].quit();
    youtubeTabs.splice(0,1);
  }

  if(i > 6){
    ClearYoutube();
    nextInScore();
    return;
  }

  var index = Math.floor(Math.random() * youtube.length);
  console.log(index);
  YoutubeSearch(youtube[index]);
  setTimeout(function () {
      YoutubeBeat(i+1);
  }, beat);
}

function NetflixAndChill(time) {
  setTimeout(function () {
    var index = Math.floor(Math.random() * netflix.length);
    NetflixSearch(netflix[index]);
  }, 10000);
  index = Math.floor(Math.random() * spotify.length);
  SpotifySearch(spotify[index]);

  setTimeout(function () {
    //clearAll();
    nextInScore(0);
  }, time * beat);
}

function nextInScore(i) {

  if (i < 1) {
    YoutubeBeat(0);
  } else {
    NetflixAndChill(6);
  }
}
