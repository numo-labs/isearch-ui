import { TAG_ADD_TAGS, TAG_REMOVE_TAG } from '../../src/constants/actionTypes';
import { expect } from 'chai';
import * as actions from '../../src/actions/tags';

describe('actions', function () {
  describe('tags', function () {
    it('should create an action to add tags', function (done) {
      const tags = ['a', 'b', 'c'];
      const expectedAction = {
        type: TAG_ADD_TAGS,
        tags: tags
      };

      expect(actions.addTags(tags)).to.deep.equal(expectedAction);
      done();
    });
    it('should create an action to remove a tag', function (done) {
      const displayName = 'sparta';
      const expectedAction = {
        type: TAG_REMOVE_TAG,
        displayName
      };
      expect(actions.deleteTag(displayName)).to.deep.equal(expectedAction);
      done();
    });
  });
});
