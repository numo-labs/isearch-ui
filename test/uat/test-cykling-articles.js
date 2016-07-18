var config = require('../../nightwatch.conf.js');

module.exports = {
  'Inspirational Search > Cykling': function (browser) {
    var TAG_LABEL = ''; // global will be set below
    browser
      .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .saveScreenshot(config.imgpath(browser) + 'tc_home.png')
      .setValue('input[type=text]', 'Cyk')
      .pause(1000)
      .waitForElementVisible('.list-group-item')
      .saveScreenshot(config.imgpath(browser) + 'tc_autocomplete.png')
      .keys(browser.Keys.DOWN_ARROW) // simulate the down arrow keyboard key
      .keys(browser.Keys.DOWN_ARROW) // simulate the down arrow keyboard key
      .saveScreenshot(config.imgpath(browser) + 'tc_autocomplete_selected.png')
      .click('.list-group-item:nth-child(2)') // click on "Cykling" in auto suggestions
      .assert.containsText('.tags', 'Cykling') //
      .pause(500)
      .moveToElement('.tags', 10, 10)
      .saveScreenshot(config.imgpath(browser) + 'cycling_tag.png')
      // find the first article on the page:
      .waitForElementVisible('.articleTileImage')
      .pause(1000)
      .moveToElement('.articleTileImage', 10, 10)
      .saveScreenshot(config.imgpath(browser) + 'results_article.png')
      .click('.articleTileImage') // view the article
      .waitForElementVisible('.addTagButton')
      .saveScreenshot(config.imgpath(browser) + 'article_page.png')
      .moveToElement('.addTagButton', 10, 10)
      .saveScreenshot(config.imgpath(browser) + 'tc_addtagbutton.png')
      .getText('.tagLabel', function (result) {
        TAG_LABEL = result.value;
        console.log('TAG_LABEL:', TAG_LABEL);
      })
      .click('.addTagButton') // add the tag
      .waitForElementVisible('.tags')
      .waitForElementVisible('.articleTileImage')
      .moveToElement('.articleTileImage', 10, 10)
      .saveScreenshot(config.imgpath(browser) + 'article_tag_added.png')
      .getText('.tag:nth-child(2)', function (result) {
        var tag = result.value.slice(0, result.value.length - 1); // remove "X"
        browser.assert.equal(tag, TAG_LABEL, 'Article Tag Added: ' + tag);
      })
      .end();
  }
};
