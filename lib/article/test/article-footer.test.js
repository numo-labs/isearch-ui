import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ArticleFooter from '../article-footer.js';

describe('Component', function () {
  describe('<ArticleFooter />', function () {
    it('Should have an .articleFooter div', function (done) {
      const wrapper = shallow(<ArticleFooter/>);
      expect(wrapper.find('.articleFooter')).to.have.length(1);
      done();
    });
  });
});
