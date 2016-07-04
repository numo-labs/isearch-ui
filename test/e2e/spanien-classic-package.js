var config = require('../../nightwatch.conf.js');

module.exports = {
  'Inspirational Search > Spanien': function (browser) {
    var PACKAGE_PRICE = 0;
    var HOTEL_PAGE_PRICE = 0;
    browser
      .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .saveScreenshot(config.imgpath(browser) + 'tc_home.png')
      .setValue('input[type=text]', 'Span')
      .waitForElementVisible('.list-group-item')
      .pause(500)
      .saveScreenshot(config.imgpath(browser) + 'tc_autocomplete.png')
      .keys(browser.Keys.DOWN_ARROW) // simulate the down arrow keyboard key
      .saveScreenshot(config.imgpath(browser) + 'tc_autocomplete_click_first.png')
      .click('.list-group-item') // click on "Spanien" in auto suggestions
      .assert.containsText('.tags', 'Spanien') //
      // find the first article on the page:
      .pause(500)
      .moveToElement('.tags', 800, 800)
      .saveScreenshot(config.imgpath(browser) + 'tc_tags.png')
      .waitForElementVisible('.packageContainer')
      .assert.containsText('.packageContainer', 'Spanien') // spain package
      .moveToElement('.packageContainer', 10, 400)
      .saveScreenshot(config.imgpath(browser) + 'tc_result_package.png')
      // get price of package result so we can confirm it on full package page
      .getText('.packageContainer .price', function (result) {
        PACKAGE_PRICE = result.value.replace(',-', '');
        console.log(' - - - - - - - - - - PACKAGE_PRICE', PACKAGE_PRICE);
      })
      .click('.packageContainer')
      .pause(500)
      .waitForElementVisible('.bookButton')
      .waitForElementVisible('.ratingIcon')
      .assert.containsText('.bookButton', 'SEE PRIS OCH BOKA')

      .saveScreenshot(config.imgpath(browser) + 'tc_package.png')
      // the price per person is first span element inside the div.hotelPrice:
      .getText('.hotelPrice span', function (result) {
        HOTEL_PAGE_PRICE = result.value;
        console.log(' - - - - - - - - - - HOTEL_PAGE_PRICE', HOTEL_PAGE_PRICE);
        browser.assert.equal(PACKAGE_PRICE, HOTEL_PAGE_PRICE * 2, 'Price Check');
      }) // see: github.com/numo-labs/isearch-ui/issues/141
      .click('.bookButton') // click on bookButton (go to spies.dk booking page)
      .pause(500)
      .waitForElementVisible('.quickfactheader')
      .assert.containsText('.quickfactheader', 'Hotelfakta')
      .saveScreenshot(config.imgpath(browser) + 'tc_booking_page.png')
      .execute(function () {
        window.history.back();
      })
      .pause(500)
      .saveScreenshot(config.imgpath(browser) + 'tc_package_again.png')
      .click('.backButton')
      .waitForElementVisible('#container')
      .pause(500)
      .assert.containsText('#container', 'Hvor vil du rejse hen')
      .saveScreenshot(config.imgpath(browser) + 'tc_isearch_home.png')
      .end();
  }
};
