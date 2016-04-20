import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ArticleTile, ArticleFullPage } from '../';

describe('Component', function () {
  const mockArticleContent = {
    amenities: [
      {
        value: 'pool',
        label: 'Swimming pool'
      }
    ],
    geo: [
      {
        value: 'usa',
        label: 'USA'
      }
    ],
    sections: [
      {
        image: 'image',
        title: 'title',
        text: 'text'
      },
      {
        image: null,
        title: null,
        text: null
      },
      {}]
  };
  const wrapperTile = shallow(<ArticleTile />);
  const childrenTile = wrapperTile.children().nodes;
  describe('<ArticleTile />', function () {
    it('should render our ArticleTile component', function (done) {
      expect(childrenTile).to.have.length(3);
      done();
    });
    it('should call viewArticle when clicking in an article tile', function (done) {
      const fakeContent = {name: 'fake content'};
      const fakeProps = {
        window: {scrollTo: () => {}},
        viewArticle: (content) => {
          expect(content).to.deep.equal(fakeContent);
          done();
        },
        content: fakeContent
      };
      const wrapper = shallow(<ArticleTile {...fakeProps}/>);
      wrapper.find('.articleContainer').simulate('click');
    });
  });
  describe('<ArticleFullPage />', function () {
    it('should render our ArticleFullPage component (empty article)', function (done) {
      const wrapperFullPage = shallow(<ArticleFullPage articleContent={mockArticleContent}/>);
      const childrenFullPage = wrapperFullPage.children().nodes;
      expect(childrenFullPage).to.have.length(3);
      done();
    });
  });
});
