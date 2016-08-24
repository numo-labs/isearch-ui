import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import DestinationTile from '../';

const props = {
  tile: {
    sections: [
      {
        image: 'u',
        title: 'hello',
        text: 'hello',
        videoUrl: 'url'
      }
    ]
  }
};

describe('Component', function () {
  const wrapper = shallow(<DestinationTile {...props}/>);
  const children = wrapper.children().nodes;
  describe('<DestinationTile />', function () {
    it('should render our DestinationTile component', function (done) {
      expect(children).to.have.length(1);
      done();
    });
    it('should render the correct children', function (done) {
      expect(wrapper.find('div')).to.have.length(12);
      done();
    });
    it('should render our video component if there is a url', function (done) {
      expect(wrapper.find('ReactPlayer')).to.have.length(1);
      done();
    });
  });
});
