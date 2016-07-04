var config = require('../../nightwatch.conf.js');

module.exports = {
  'Inspirational Search > Cykling': function (browser) {
    browser
      .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .saveScreenshot(config.imgpath(browser) + 'tc_home.png')
      .setValue('input[type=text]', 'Cykl')
      .waitForElementVisible('.list-group-item')
      .pause(1000)
      .saveScreenshot(config.imgpath(browser) + 'tc_autocomplete.png')
      .keys(browser.Keys.DOWN_ARROW) // simulate the down arrow keyboard key
      .keys(browser.Keys.DOWN_ARROW) // simulate the down arrow keyboard key
      .saveScreenshot(config.imgpath(browser) + 'tc_autocomplete_selected.png')
      .click('.list-group-item:nth-child(2)') // click on "Spanien" in auto suggestions
      .assert.containsText('.tags', 'Cykling') //
      .pause(500)
      .moveToElement('.tags', 800, 800)
      .saveScreenshot(config.imgpath(browser) + 'tc_tags.png')
      // find the first article on the page:
      .waitForElementVisible('.articleTileImage')
      .moveToElement('.articleTileImage', 200, 800)
      .saveScreenshot(config.imgpath(browser) + 'tc_result_article.png')
      .click('.articleTileImage')
      // .waitForElementVisible('.packageContainer')
      // .assert.containsText('.packageContainer', 'Spanien') // spain package
      // .moveToElement('.packageContainer', 10, 400)
      // .saveScreenshot(config.imgpath(browser) + 'tc_result_package.png')
      // // get price of package result so we can confirm it on full package page
      // .getText('.packageContainer .price', function (result) {
      //   PACKAGE_PRICE = result.value.replace(',-', '');
      //   console.log(' - - - - - - - - - - PACKAGE_PRICE', PACKAGE_PRICE);
      // })
      // .click('.packageContainer')
      // .pause(500)
      .waitForElementVisible('.addTagButton')
      .moveToElement('.addTagButton', 10, 400)
      .saveScreenshot(config.imgpath(browser) + 'tc_addtagbutton.png')
      .click('.addTagButton') // click on bookButton (go to spies.dk booking page)
      .pause(5000)

      // .waitForElementVisible('.ratingIcon')
      // .assert.containsText('.bookButton', 'SEE PRIS OCH BOKA')
      //
      // .saveScreenshot(config.imgpath(browser) + 'tc_package.png')
      // // the price per person is first span element inside the div.hotelPrice:
      // .getText('.hotelPrice span', function (result) {
      //   HOTEL_PAGE_PRICE = result.value;
      //   console.log(' - - - - - - - - - - HOTEL_PAGE_PRICE', HOTEL_PAGE_PRICE);
      //   browser.assert.equal(PACKAGE_PRICE, HOTEL_PAGE_PRICE * 2, 'Price Check');
      // }) // see: github.com/numo-labs/isearch-ui/issues/141

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
  }
};
