import { VIEW_ARTICLE } from '../../src/constants/actionTypes';
import { expect } from 'chai';
import * as actions from '../../src/actions/article';

describe('actions', function () {
  describe('article', function () {
    it('should create an action to view an article', function (done) {
      const articleContent = {
        name: 'articleName'
      };
      const expectedAction = {
        type: VIEW_ARTICLE,
        content: articleContent
      };
      expect(actions.viewArticle(articleContent)).to.deep.equal(expectedAction);
      done();
    });
  });
});
