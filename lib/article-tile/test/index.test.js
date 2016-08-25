import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ArticleTile from '../';

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
    },
    className: ''
  };

  describe('<ArticleTile />', function () {
    const wrapper = shallow(<ArticleTile {...props}/>);
    const children = wrapper.children().nodes;
    it('should render our ArticleTile component', function (done) {
      expect(children).to.have.length(3);
      done();
    });
    it('should render the correct child components', function (done) {
      expect(wrapper.find('div')).to.have.length(5);
      expect(wrapper.find('FadeImage')).to.have.length(1);
      expect(wrapper.find('h2')).to.have.length(1);
      expect(wrapper.find('h3')).to.have.length(1);
      expect(wrapper.find('h4')).to.have.length(1);
      done();
    });
  });
});
