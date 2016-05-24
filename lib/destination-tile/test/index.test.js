import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import DestinationTile from '../';

describe('Component', function () {
  const wrapper = shallow(<DestinationTile />);
  const children = wrapper.children().nodes;
  describe('<DestinationTile />', function () {
    it('should render our DestinationTile component', function (done) {
      expect(children).to.have.length(2);
      done();
    });
  });
});
