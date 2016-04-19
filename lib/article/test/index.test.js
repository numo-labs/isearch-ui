import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ArticleTile, ArticleFullPage } from '../';

describe('Component', function () {
  const mockArticleContent = {
    sections: []
  };
  const wrapperTile = shallow(<ArticleTile />);
  const childrenTile = wrapperTile.children().nodes;
  const wrapperFullPage = shallow(<ArticleFullPage articleContent={mockArticleContent}/>);
  const childrenFullPage = wrapperFullPage.children().nodes;
  describe('<ArticleTile />', function () {
    it('should render our ArticleTile component', function (done) {
      expect(childrenTile).to.have.length(3);
      done();
    });
  });
  describe('<ArticleFullPage />', function () {
    it('should render our ArticleFullPage component', function (done) {
      expect(childrenFullPage).to.have.length(3);
      done();
    });
  });
});
