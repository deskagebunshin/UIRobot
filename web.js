
module.export = {
  Netflix: function (show){
    var password =  "2209@Tocino";
    var username = 'eric.diseno@gmail.com';
    var time = 300000;

    var assert = require('assert');

    var webdriver = require ('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;

    var chromeCapabilities = webdriver.Capabilities.chrome();
    //setting chrome options to start the browser fully maximized
    var chromeOptions = {
        'args': ['--start-maximized', '--mute-audio']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    var driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();
    driver.get('https://www.netflix.com/login');
    var usr = driver.wait(until.elementLocated({ name: 'email' }), time);
    driver.wait(until.elementIsVisible(usr), time).sendKeys(username).then(function (text) {
      var pwd = driver.wait(until.elementLocated({ name: 'password' }), time);
      driver.wait(until.elementIsVisible(pwd), time).sendKeys(password);
      var password2 = driver.wait(until.elementLocated({ xpath: '//*[@value="'+password+'"]' }), time);
      driver.wait(until.elementIsVisible(password2), time).sendKeys('\n').then(function () {
        var userSel =  driver.wait(until.elementLocated({ className: 'profile-icon' }), time);
        driver.wait(until.elementIsVisible(userSel), time).click().then(function functionName() {
          var search = driver.wait(until.elementLocated({ className: 'searchTab' }), time);
          driver.wait(until.elementIsVisible(search), time).click().then(function () {
            var searchinput = driver.wait(until.elementLocated({ xpath: '//input[@dir="ltr"]' }), time);
            driver.wait(until.elementIsVisible(searchinput), time).sendKeys(show).then(function () {
              var searchresult = driver.wait(until.elementLocated({ xpath: '//*[@id="title-card-0-0"]/div' }), time);
              driver.wait(until.elementIsVisible(searchresult), time).click().then(function () {
                setTimeout(function () {
                  var play = driver.wait(until.elementLocated({ className: ' playLink' }), time);
                  driver.wait(until.elementIsVisible(play), time).click();
                }, 1000);
              });
            });
          });
        });
      });
    });

    return driver;

  },

  Youtube: function (link) {
    var assert = require('assert');

    var webdriver = require ('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;

    var chromeCapabilities = webdriver.Capabilities.chrome();
    //setting chrome options to start the browser fully maximized
    var chromeOptions = {
        'args': []
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    var driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();
    driver.get(link);

    return driver;
  },


  Spotify: function (artist) {
    var password =  "2209@tocino";
    var username = 'afroboy55@gmail.com';
    var time = 30000;

    var assert = require('assert');

    var webdriver = require ('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;

    var chromeCapabilities = webdriver.Capabilities.chrome();
    //setting chrome options to start the browser fully maximized
    var chromeOptions = {
        'args': []
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    var driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();
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
                driver.wait(until.elementIsVisible(play), time).click();
              });
            });
          });
        });
      });
    });

    return driver;
  }
};
