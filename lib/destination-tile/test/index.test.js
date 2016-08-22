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
        text: 'hello'
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
  });
});
