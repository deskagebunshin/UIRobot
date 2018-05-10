const colundi = require('./colundi');
var netflixDeets = {pass:"2209@Tocino", user:"eric.diseno@gmail.com"};
// var netflixDeets = {pass:"Julian1-1", user:"fanghane@gmail.com"};
function searchNetflix(driver, show) {
  var webdriver = require ('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

  var time  = 30000;
  driver.get('https://www.netflix.com');
  var search = driver.wait(until.elementLocated({ className: 'searchTab' }), time);
  driver.wait(until.elementIsVisible(search), time).click().then(function () {
    var searchinput = driver.wait(until.elementLocated({ xpath: '//input[@dir="ltr"]' }), time);
    driver.wait(until.elementIsVisible(searchinput), time).sendKeys(show).then(function () {
      setTimeout(function () {
        var searchresult = driver.wait(until.elementLocated({ xpath: '//*[@id="title-card-0-0"]/div' }), time);
        driver.wait(until.elementIsVisible(searchresult), time).click().then(function () {
          setTimeout(function () {
            var play = driver.wait(until.elementLocated({ className: ' playLink' }), time);
            driver.wait(until.elementIsVisible(play), time).click().then(function () {
              var searchresult = driver.wait(until.elementLocated({xpath: "//*[contains(text(), 'Whoops')]"}), time).then(function () {
                console.log("whoops");
                var hold = netflixDeets;

              });
            });
          }, 2222);
        });
      }, 2222);
    });
  });
}

function killAfter(driver) {
  console.log("quitsequenceinitiated");
  setTimeout(function () {
    console.log("quittin");

      driver.quit();
      driver = undefined;

  }, 60000*8);
}

module.exports = {
  Netflix: function (show){
    var password =  netflixDeets.pass;
    var username = netflixDeets.user;
    var time = 10000;

    var assert = require('assert');

    var webdriver = require ('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;

    var chromeCapabilities = webdriver.Capabilities.chrome();
    //setting chrome options to start the browser fully maximized
    var chromeOptions = {
        'args': ['--start-maximized', '--mute-audio', '--disable-infobars']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    var driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();
    driver.manage().deleteAllCookies();
    driver.get('https://www.netflix.com/login');
    var usr = driver.wait(until.elementLocated({ name: 'email' }), time);
    driver.wait(until.elementIsVisible(usr), time).sendKeys(username).then(function (text) {
      var pwd = driver.wait(until.elementLocated({ name: 'password' }), time);
      driver.wait(until.elementIsVisible(pwd), time).sendKeys(password);
      var password2 = driver.wait(until.elementLocated({ xpath: '//*[@value="'+password+'"]' }), time);
      driver.wait(until.elementIsVisible(password2), time).sendKeys('\n').then(function () {
        var userSel =  driver.wait(until.elementLocated({ className: 'profile-icon' }), time);
        driver.wait(until.elementIsVisible(userSel), time).click().then(function () {
          searchNetflix(driver, show);
        });
      });
    });

    return driver;

  },



  SpotifyNext: function (driver) {
    if (driver !== undefined) {
      var webdriver = require ('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;
      var time  = 30000;
      var next = driver.wait(until.elementLocated({ xpath: '//button[@title="Next"]' }), time);
      driver.wait(until.elementIsVisible(next), time).click();
    }
  },

  NewNetflix: function (driver, show){
    searchNetflix(driver, show);
  },

  Website: function (link) {
    var assert = require('assert');

    var webdriver = require ('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;

    var time = 3000;
    var chromeCapabilities = webdriver.Capabilities.chrome();
    //setting chrome options to start the browser fully maximized
    var chromeOptions = {
        'args': ['--disable-infobars']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    var driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();
    var windowOptions = {height: 800, width: 800, x: Math.floor(Math.random() * 1100), y: Math.floor(Math.random() * 500)}
    driver.manage().window().setRect(windowOptions);
    driver.get(link);
    var user = driver.wait(until.elementLocated({ id:"bgvid" }), time);
    driver.wait(until.elementIsVisible(user), time).click().catch(function () {
      console.log("no bgvid");
    });
    killAfter(driver);
    return driver;
  },

  Instagram: function (link) {
    var assert = require('assert');
    var time  = 30000;
    var webdriver = require ('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;

    var chromeCapabilities = webdriver.Capabilities.chrome();
    //setting chrome options to start the browser fully maximized
    var chromeOptions = {
        'args': ['--disable-infobars']
    };

    var username = "ericfanghanel";
    var password = "2209@Tocino";

    chromeCapabilities.set('chromeOptions', chromeOptions);
    var driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();
    driver.get("https://www.instagram.com/accounts/login/");

    var windowOptions = {height: 2400, width: 800, x: Math.floor(Math.random() * 800), y: Math.floor(Math.random() * 10)}
    driver.manage().window().setRect(windowOptions);

    var user = driver.wait(until.elementLocated({ xpath: '//input[@name="username"]' }), time);
    driver.wait(until.elementIsVisible(user), time).sendKeys(username).then(function () {
      var pass = driver.wait(until.elementLocated({ xpath: '//input[@name="password"]' }), time);
      driver.wait(until.elementIsVisible(pass), time).sendKeys(password + "\n").then(function () {
        if (link !== "https://www.instagram.com/") {
          driver.get(link);
        }
      });

    });

    killAfter(driver);
    return driver;
  },

  Facebook: function (link) {
    var assert = require('assert');
    var time  = 30000;
    var webdriver = require ('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;

    var chromeCapabilities = webdriver.Capabilities.chrome();
    //setting chrome options to start the browser fully maximized
    var chromeOptions = {
        'args': ['--disable-infobars', "--disable-notifications"]
    };

    var username = "deskagebunshin@gmail.com";
    var password = "2209@tocino";

    chromeCapabilities.set('chromeOptions', chromeOptions);
    var driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();
    driver.get("https://www.facebook.com/login");

    var windowOptions = {height: 1200, width: 800, x: Math.floor(Math.random() * 800), y: Math.floor(Math.random() * 10)}
    driver.manage().window().setRect(windowOptions);

    var user = driver.wait(until.elementLocated({ xpath: '//input[@name="email"]' }), time);
    driver.wait(until.elementIsVisible(user), time).sendKeys(username).then(function () {
      var pass = driver.wait(until.elementLocated({ xpath: '//input[@name="pass"]' }), time);
      driver.wait(until.elementIsVisible(pass), time).sendKeys(password + "\n").then(function () {
          driver.get(link);
      });

    });

    killAfter(driver);
    return driver;
  },

  Scroll: function (driver) {
    var i = 0 ,
    interval = setInterval(function () {
      if(driver !== undefined){

        driver.executeScript("window.scrollBy(0, "+colundi.index(i)/4+");").catch(function () {
        clearInterval(interval);
        });
        i++;
        if(Math.random()<0.333){
          i = Math.floor(Math.random()*1000);
        }
      } else{
        clearInterval(interval);
      }
    }, 100);
  },

  Twitch: function () {
    var assert = require('assert');

    var webdriver = require ('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;

    var chromeCapabilities = webdriver.Capabilities.chrome();
    //setting chrome options to start the browser fully maximized
    var chromeOptions = {
        'args': ['--disable-infobars']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    var driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();

    var windowOptions = {height: 600, width: 800, x: Math.floor(Math.random() * 800) + 300, y: Math.floor(Math.random() * 500)}
    driver.manage().window().setRect(windowOptions);

    driver.get(link).then(function () {
      var next = driver.wait(until.elementLocated({ className: 'videoAdUiSkipButton' }), 30000);
      driver.wait(until.elementIsVisible(next), 30000).click().then(function () {
        console.log("clicked out");
      }).catch(function () {
        console.log("no next");
      });

    });
    killAfter(driver);
  },

  Youtube: function (link, scale) {
    var assert = require('assert');

    var webdriver = require ('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;

    var chromeCapabilities = webdriver.Capabilities.chrome();
    //setting chrome options to start the browser fully maximized
    var chromeOptions = {
        'args': ['--disable-infobars']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    var driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();

    var windowOptions = {height: 800, width: 1000, x: Math.floor(Math.random() * 800) + 300, y: Math.floor(Math.random() * 500)}
    driver.manage().window().setRect(windowOptions);

    driver.get(link).then(function () {
      var next = driver.wait(until.elementLocated({ className: 'videoAdUiSkipButton' }), 30000);
      driver.wait(until.elementIsVisible(next), 30000).click().then(function () {
        console.log("clicked out");
      }).catch(function () {
        console.log("no next");
      });

    });

    killAfter(driver);
    return driver;
  },

  SpotifyNew: function (driver, artist) {
    var password =  "2209@tocino";
    var username = 'deskagebunshin@gmail.com';
    var time = 300000;

    var assert = require('assert');

    var webdriver = require ('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;

    driver.get('https://accounts.spotify.com/en/login?utm_source=webplayer&utm_medium=&utm_campaign=&continue=https:%2F%2Fopen.spotify.com%2Fbrowse');
    var facebook = driver.wait(until.elementLocated({ xpath: '/html/body/div[2]/div/div[1]/div/a' }), time);
    var searchIcon = driver.wait(until.elementLocated({ xpath: '//a[@href="/search"]' }), time);

    driver.wait(until.elementIsVisible(searchIcon), time).click().then(function () {
      var searchInput = driver.wait(until.elementLocated({ className: 'inputBox-input' }), time);
      driver.wait(until.elementIsVisible(searchInput), time).sendKeys(artist + '\n').then(function () {
        var artist = driver.wait(until.elementLocated({ className: 'mo-info-name' }), time);
        driver.wait(until.elementIsVisible(artist), time).click().then(function () {
          var play = driver.wait(until.elementLocated({ xpath: '//button[contains(text(), "PLAY")]' }), time);
          driver.wait(until.elementIsVisible(play), time).click().then(function () {
            setTimeout(function () {
              var shuffle = driver.wait(until.elementLocated({ xpath: '//button[@title="Enable shuffle"]' }), time);
              driver.wait(until.elementIsVisible(shuffle), time).click().then(function functionName() {
                var next = driver.wait(until.elementLocated({ xpath: '//button[@title="Next"]' }), time);
                driver.wait(until.elementIsVisible(next), time).click().then(function () {

                });
              });
            }, 1000);

          });
        });
      });
    });
  },

  Spotify: function (artist) {
    var password =  "2209@tocino";
    var username = 'deskagebunshin@gmail.com';
    var time = 300000;

    var assert = require('assert');

    var webdriver = require ('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;

    var chromeCapabilities = webdriver.Capabilities.chrome();
    //setting chrome options to start the browser fully maximized
    var chromeOptions = {
        'args': ['--disable-infobars']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    setTimeout(function () {
      console.log("minimize");
      var windowOptions = {height: 1000, width: 1000, x: Math.floor(Math.random() * 800) + 500, y: Math.floor(Math.random() * 500)+500}
      driver.manage().window().setRect(windowOptions);
    }, 5000);
    var driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();
    const actions = driver.actions();
    const kb = actions.keyboard();
    const mouse = actions.mouse();
    driver.get('https://accounts.spotify.com/en/login?utm_source=webplayer&utm_medium=&utm_campaign=&continue=https:%2F%2Fopen.spotify.com%2Fbrowse');
    var facebook = driver.wait(until.elementLocated({ xpath: '/html/body/div[2]/div/div[1]/div/a' }), time);
    driver.wait(until.elementIsVisible(facebook), time).click().then(function () {
      var usr = driver.wait(until.elementLocated({ name: 'email' }), time);
      driver.wait(until.elementIsVisible(usr), time).sendKeys(username).then(function () {
        var pwd = driver.wait(until.elementLocated({ name: 'pass' }), time);
        driver.wait(until.elementIsVisible(pwd), time).sendKeys(password + '\n').then(function functionName() {
          var searchIcon = driver.wait(until.elementLocated({ xpath: '//a[@href="/search"]' }), time);
          driver.wait(until.elementIsVisible(searchIcon), time).click().then(function () {
            var searchInput = driver.wait(until.elementLocated({ className: 'inputBox-input' }), time);
            driver.wait(until.elementIsVisible(searchInput), time).sendKeys(artist + '\n').then(function () {
              var artist = driver.wait(until.elementLocated({ className: 'mo-info-name' }), time);
              driver.wait(until.elementIsVisible(artist), time).click().then(function () {
                var play = driver.wait(until.elementLocated({ xpath: '//button[contains(text(), "PLAY")]' }), time);
                driver.wait(until.elementIsVisible(play), time).click().then(function () {
                  setTimeout(function () {
                    var shuffle = driver.wait(until.elementLocated({ xpath: '//button[@title="Enable shuffle"]' }), time);
                    driver.wait(until.elementIsVisible(shuffle), time).click().then(function functionName() {
                      var next = driver.wait(until.elementLocated({ xpath: '//button[@title="Next"]' }), time);
                      driver.wait(until.elementIsVisible(next), time).click().then(function () {
                        // var vol = driver.wait(until.elementLocated({ xpath: '//div[@cassName="progress-bar__fg"]' }), time);
                        // driver.wait(until.elementIsVisible(vol), time).click()

                      });
                    });
                  }, 1000);

                });
              });
            });
          });
        });
      });
    });

    return driver;
  }
};
