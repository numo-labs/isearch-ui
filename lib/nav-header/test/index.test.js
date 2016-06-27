import React from 'react';
import { shallow } from 'enzyme';
import NavHeader from '../';

describe('Component', function () {
  describe('<NavHeader />', function () {
    it('Should call go action when clicking the left arrow', function (done) {
      const go = () => done();
      const wrapper = shallow(<NavHeader go={go}/>);
      wrapper.find('.backButton').simulate('click');
    });
  });
});
