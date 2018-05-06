const perlin = require('perlin-noise');
var socket = require('socket.io-client')('http://mindcontroll.herokuapp.com');
const web = require('./web');
const colundi = require('./colundi');
var spotifyTab, netflixTab, youtubeTabs = [], youtubeTab, youtubeMusicTab, facebookTab, facebookTabs = [],  webTabs = [], instagramTab;
var netflix = [], spotify = [], youtube = [],youtubeMusic = [], facebook = [], webLinks = [], instagram = [];
var score = perlin.generatePerlinNoise(1, 1000);
var scoreIndex = 0;
const fs = require('fs');
var bpm = 440;
var beat = (60000/bpm)*16;
var start = true;

GetData();

for (var i = 0; i < score.length; i++) {
  score[i] = Math.floor(score[i]*colundi.colundi.length);
}

function speed(index) {
  console.log('current beat = ' + beat);
  setTimeout(function () {
    var newBeat = colundi.index[score[index]%colundi.colundi.length];
    newBeat = (60000/speed)*16;
    beat = newBeat;
    console.log('new beat = ' + beat);
    index++;
    speed(index);
  }, beat * 16 );
}


setTimeout(function () {
  console.log(youtube);
  console.log(spotify);
  console.log(netflix);
  nextInScore(0);
  //speed(0);


  // TEST SPOTIFY
  // var i = Math.floor(Math.random()*spotify.length);
  // SpotifySearch(spotify[i]);
  // setInterval(function () {
  //   var i = Math.floor(Math.random()*spotify.length);
  //   SpotifySearch(spotify[i]);
  // }, 30000);

  // // TEST Youtube Music
  // setInterval(function () {
  //   var i = Math.floor(Math.random()*youtubeMusic.length);
  //   YoutubeMusic(youtubeMusic[i]);
  // }, 10000);
  // var i = Math.floor(Math.random()*netflix.length);
  // NetflixSearch(netflix[i]);
  // // // TEST Netflix
  // setInterval(function () {
  //   var i = Math.floor(Math.random()*netflix.length);
  //   NetflixSearch(netflix[i]);
  // }, 30000);

  // TEST WEBSITE
  // setInterval(function () {
  //   WebTab();
  // }, 5000);

  // TEST One Youtube
  // setInterval(function () {
  //   OneYoutube();
  // }, 5000);

}, 5000);

function GetData(srcPath, object) {
  fs.readFile('./Instagram.json', 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        console.log('file read');
        if(data){
           instagram = JSON.parse(data);
        }
    });
  fs.readFile('./Youtube.json', 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        console.log('file read');
        if(data){
           var allData = JSON.parse(data);
           for (var i = 0; i < allData.length; i++) {
             if (allData[i].tags.includes("music")) {
               youtubeMusic.push(allData[i]);
             } else {
               youtube.push(allData[i]);
             }
           }
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
          fs.readFile('./Facebook.json', 'utf8', function (err, data) {
                if (err) {
                  return console.log(err);
                }
                console.log('file read');
                if(data){
                   facebook = JSON.parse(data);
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

socket.on('fromVR', function(data){
  console.log('message from VR');
  if(spotifyTab){
    web.SpotifyNext(spotifyTab)
  } else {
    var index = Math.floor(Math.random() * spotify.length);
    SpotifySearch(spotify[index]);
  }
});

function YoutubeMusic() {
  console.log("youtube music length", youtubeMusic.length);
  var i = Math.floor((youtubeMusic.length*Math.random()));
  console.log();
  if (youtubeMusicTab !== undefined) {
    youtubeMusicTab.quit();
    youtubeMusicTab = undefined;
  }
  youtubeMusicTab = web.Youtube(youtubeMusic[i].link);
  console.log("new music tab");
}

function clearAll(){
  if(spotifyTab){
    setTimeout(function () {
      spotifyTab.quit();
      spotifyTab = undefined;
    }, beat);
  }
  // if(netflixTab){
  //   netflixTab.quit();
  //   netflixTab = undefined;
  // }
  if(youtubeTabs.length > 0){
    for (var i = 0; i < youtubeTabs.length; i++) {
      youtubeTabs[i].quit();
    }
    youtubeTabs = [];
  }
  if (facebookTab) {
    facebookTab.quit();
    facebookTab = undefined;
  }
  if (instagramTab) {
    instagramTab.quit();
    instagramTab = undefined;
  }
}

function SpotifySearch(artist) {
  if(spotifyTab){
    web.SpotifyNew(spotifyTab, artist);
  } else{
    spotifyTab = web.Spotify(artist);
  }

}

function NetflixSearch(artist) {
  if(netflixTab){
    web.NewNetflix(netflixTab, artist);
  } else {
    if (netflixTab) {
      netflixTab.quit();
      netflixTab = undefined;
    }
    netflixTab = web.Netflix(artist);
  }
}

function YoutubeSearch(page) {
  youtubeTabs.push(web.Youtube(page.link));
}

function ClearYoutube(page) {
  if(youtubeTabs.length > 0){
    for (var i = 0; i < youtubeTabs.length; i++) {
      youtubeTabs[i].quit();
    }
    youtubeTabs = [];
  }
}

function WebTab(page) {
  if(webTabs.length > 2){
    for (var i = 0; i < webTabs.length; i++) {
      webTabs[i].quit();
    }
    webTabs = [];
  }
  webTabs.push(web.Website(webLinks[Math.floor(Math.random()*webLinks.length)]));

  setTimeout(function () {
    if (webTabs.length>0) {
      for (var i = 0; i < webTabs.length; i++) {
        if(webTabs[i] != undefined){
          webTabs[i].quit();
          webTabs[i] = undefined
        }
      }
    }
    webTabs = [];
    if(Math.random()>0.1){
      var index = Math.floor(Math.random()*web.length)
      WebTab(web[index]);
    }
  }, beat*64);
}

function YoutubeBeat(i, colundiBeat) {
  console.log("YoutubeBeat");
  if (youtubeTabs.length >= 4) {
    youtubeTabs[0].quit();
    youtubeTabs.splice(0,1);
  }

  if(i > 8){
    ClearYoutube();
    return;
  }

  var index = Math.floor(Math.random() * youtube.length);
  YoutubeSearch(youtube[index]);
  setTimeout(function () {
      YoutubeBeat(i+1, colundiBeat);
  }, colundiBeat);
}

function NetflixAndChill(time) {

  setTimeout(function () {
    var index = Math.floor(Math.random() * netflix.length);
    NetflixSearch(netflix[index]);
  }, 10000);
  if (youtubeMusicTab) {
    youtubeMusicTab.quit();
    youtubeMusicTab = undefined;
  }

  index = Math.floor(Math.random() * spotify.length);
  SpotifySearch(spotify[index]);


}

function OneYoutube() {
  console.log("one youtube!");
  if(youtubeTab){
    youtubeTab.quit();
  }
  youtubeTab = web.Youtube(youtube[Math.floor(Math.random()*youtube.length)].link);
  setTimeout(function () {
    if(youtubeTab){
      youtubeTab.quit();
      youtubeTab = undefined;
    }
    if(Math.random > 0.1){
      OneYoutube();
    }
  }, beat*16);
}

function nextInScore(i) {
console.log('tick');
  setTimeout(function () {
    i+=1;
    i%=4;
    nextInScore(i);
  }, beat);
  if(i == 0){
    if(Math.random()<0.06 || start){
      NetflixAndChill();
      console.log("Netflix And Chill");
      start = false;
    } else if(Math.random()<0.06){
      console.log("DEATH");
      clearAll();
      YoutubeMusic();
    }
  }

  if(i == 2){
    if(Math.random()<0.06){
      Instagram()
    }
    if(Math.random()<0.06){
      FacebookGroup()
    }
  }

  if(i==3){
    if(Math.random()<0.041){
      YoutubeBeat(0, colundi.randomInBand(0,10));
    } else if (Math.random()<0.02) {
      var index = Math.floor(Math.random()*web.length)
      WebTab(web[index]);
    }
  }
  if(i == 1){
    if(Math.random() <  0.2){
      OneYoutube();
    }
  }

  //console.log('next');
}

function Instagram() {
  if(instagramTab){
    instagramTab.quit();
  }
  instagramTab = web.Instagram();
  setTimeout(function () {
    web.Scroll(instagramTab);
  }, colundi.randomInBand(0,10));

}

function FacebookGroup(){
  if(facebookTab){
    facebookTab.quit();
  }
  facebookTab = web.Facebook(facebook[Math.floor(Math.random()*facebook.length)]);
  setTimeout(function () {
    web.Scroll(facebookTab);
  }, colundi.randomInBand(0,10));
}

// function nextInScore(i) {
//   // index = Math.floor(Math.random() * spotify.length);
//   // SpotifySearch(spotify[index]);
//   var time = colundi.randomInBand(0,10)*16;
//   console.log(time);
//
//   if(Math.random()>0.3){
//     WebTab();
//   }
//   if (i < 1) {
//     YoutubeBeat(0, colundi.randomInBand(0,10));
//   } else {
//     NetflixAndChill(time);
//   }
// }
