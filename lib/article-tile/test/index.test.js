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
      ],
      name: 'name'
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
    className: '',
    overview: 'overview'
  };

  describe('<ArticleTile />', function () {
    const wrapper = shallow(<ArticleTile {...props}/>);
    const children = wrapper.children().nodes;
    it('should render our ArticleTile component', function (done) {
      expect(children).to.have.length(3);
      done();
    });
    it('should render the correct content', function (done) {
      const h3Text = wrapper.find('.text h3').text();
      const h4Text = wrapper.find('.text h4').text();
      const h2Text = wrapper.find('.text h2').text();
      const tagLabel = wrapper.find('.tagLabel').text();
      const addTagButton = wrapper.find('.addTagButton').text();
      expect(h3Text).to.equal('du har læst');
      expect(h4Text).to.equal(props.overview);
      expect(h2Text).to.equal(props.tile.name);
      expect(tagLabel).to.equal(props.tile.name);
      expect(addTagButton).to.equal('+');
      expect(wrapper.find('FadeImage')).to.have.length(1);
      done();
    });
  });
});
