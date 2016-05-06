import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ArticleTile, ArticleFullPage } from '../';

describe('Component', function () {
  const props = {
    tile: {
      tags: [
        {
          label: 'test',
          value: 'test'
        }
      ]
    },
    articleContent: {
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
    }
  };
  const fakeContent = {
    name: 'fake content',
    sections: props.sections,
    tags: [
      {
        label: 'test',
        value: 'test'
      }
    ]
  };

  describe('<ArticleTile />', function () {
    it('should render our ArticleTile component', function (done) {
      const wrapperTile = shallow(<ArticleTile {...props}/>);
      const childrenTile = wrapperTile.children().nodes;
      expect(childrenTile).to.have.length(3);
      done();
    });
    it('should call viewArticle when clicking in an article tile', function (done) {
      const fakeProps = {
        window: {scrollTo: () => {}},
        viewArticle: (content) => {
          expect(content).to.deep.equal(fakeContent);
          done();
        },
        tile: fakeContent
      };
      const wrapper = shallow(<ArticleTile {...fakeProps}/>);
      wrapper.find('.articleContainer').simulate('click');
    });
  });
  describe('<ArticleFullPage />', function () {
    it('should render our ArticleFullPage component (empty article)', function (done) {
      const wrapperFullPage = shallow(<ArticleFullPage {...props}/>);
      const childrenFullPage = wrapperFullPage.children().nodes;
      expect(childrenFullPage).to.have.length(3);
      done();
    });
  });
});
