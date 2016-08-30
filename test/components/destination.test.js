import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DestinationFullPage from '../../src/components/destination';

const props = {
  articleContent: {
    name: 'name',
    sections: [{
      image: 'image',
      title: 'title',
      text: 'text',
      videoUrl: 'url'
    }, {
      image: 'image2',
      title: 'title2',
      text: 'text2'
    }],
    geo: [{label: 'Spain'}],
    amenities: [{label: 'Wifi'}]
  },
  goBack: () => {},
  getArticle: () => {},
  go: () => {},
  addSingleTag: () => {},
  addArticleTag: () => {}
};

describe('Component', function () {
  const wrapper = shallow(<DestinationFullPage {...props} />);
  const children = wrapper.children().nodes;
  it('should render our <Destination /> component', function (done) {
    expect(children).to.have.length(1);
    done();
  });
  it('should render the correct children', function (done) {
    expect(wrapper.find('ArticleFullPage')).to.have.length(1);
    expect(wrapper.find('GoogleMapLoader')).to.have.length(1);
    done();
  });
});
