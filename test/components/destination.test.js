
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import DestinationFullPage from '../../src/components/destination/';

const defaultProps = {
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
  backToSearch: () => {},
  getArticle: () => {},
  params: {}
};

describe('Component', function () {
  describe('<DestinationFullPage /> Destination view', function () {
    it('should render the container', function (done) {
      global.dataLayer = [];
      const wrapper = shallow(<DestinationFullPage {...defaultProps} />);
      const children = wrapper.children().nodes;
      expect(children).to.have.length(3);
      done();
    });
    it('should render a empty section if there is no destination name', function (done) {
      global.dataLayer = null;
      const props = {...defaultProps, articleContent: {}};
      const wrapper = shallow(<DestinationFullPage {...props} />);
      const children = wrapper.children().nodes;
      expect(children).to.have.length(0);
      done();
    });
    it('should render our video component if there is a video url', function (done) {
      const wrapper = shallow(<DestinationFullPage {...defaultProps} />);
      expect(wrapper.find('video')).to.have.length(1);
      done();
    });
  });
});
