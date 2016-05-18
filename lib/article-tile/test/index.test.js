import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ArticleTile } from '../';

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

  describe('<ArticleTile />', function () {
    it('should render our ArticleTile component', function (done) {
      const wrapperTile = shallow(<ArticleTile {...props}/>);
      const childrenTile = wrapperTile.children().nodes;
      expect(childrenTile).to.have.length(2);
      done();
    });
  });
});
