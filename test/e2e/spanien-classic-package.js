var config = require('../../nightwatch.conf.js');

module.exports = {
  'Inspirational Search': function (browser) {
    var PACKAGE_PRICE = 0;
    browser
      .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .saveScreenshot(config.imgpath(browser) + 'tc_home.png')
      .setValue('input[type=text]', 'Span')
      .waitForElementVisible('.list-group-item')
      .pause(500)
      .saveScreenshot(config.imgpath(browser) + 'tc_autocomplete.png')
      // simulate the down arrow key being pressed:
      .keys(browser.Keys.DOWN_ARROW)
      .saveScreenshot(config.imgpath(browser) + 'tc_autocomplete_click_first.png')
      .click('.list-group-item') // click on "Spanien" in auto suggestions
      .assert.containsText('.tags', 'Spanien') //
      // find the first article on the page:
      .pause(500)
      .moveToElement('.tags', 800, 800)
      .saveScreenshot(config.imgpath(browser) + 'tc_tags.png')
      // .waitForElementVisible('.articleTileImage')
      // .moveToElement('.articleTileImage', 200, 800)
      // .saveScreenshot(config.imgpath(browser) + 'tc_result_article.png')

      .waitForElementVisible('.packageContainer')
      // .assert.containsText('.packageContainer', 'Spanien') // spainish package
      .moveToElement('.packageContainer', 10, 400)
      .saveScreenshot(config.imgpath(browser) + 'tc_result_package.png')
      .getText('.packageContainer .price',function(result) {
        var price = result.value.replace(',-', '');
        console.log(' - - - - - - - - - - #1 Price:', price)
        PACKAGE_PRICE = price;
      })
      .getText('.packageContainer:nth-child(1) + .packageContainer .price',function(result) {
        console.log('result', result);
        // var price = result.value.replace(',-', '');
        // console.log(' - - - - - - - - - - #2 Price:', price)
        // PACKAGE_PRICE = price;
      })
      // .click('.packageContainer')
      // .pause(500)
      // .waitForElementVisible('.bookButton')
      // .waitForElementVisible('.ratingIcon')
      // .assert.containsText('.bookButton', 'SEE PRIS OCH BOKA')
      // // .pause(500)
      // .saveScreenshot(config.imgpath(browser) + 'tc_package.png')
      // // click on bookButton (takes you to the booking page on spies.dk)
      // .click('.bookButton')
      // .pause(500)
      // .waitForElementVisible('.quickfactheader')
      // .assert.containsText('.quickfactheader', 'Hotelfakta')
      // .saveScreenshot(config.imgpath(browser) + 'tc_booking_page.png')
      // .execute(function () {
      //   window.history.back();
      // })
      // .pause(500)
      // .saveScreenshot(config.imgpath(browser) + 'tc_package_again.png')
      // .click('.backButton')
      // .waitForElementVisible('#container')
      // .pause(500)
      // .assert.containsText('#container', 'Hvor vil du rejse hen')
      // .saveScreenshot(config.imgpath(browser) + 'tc_isearch_home.png')
      .end();
      console.log('Price:', PACKAGE_PRICE);
  }
};
