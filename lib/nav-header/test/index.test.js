import React from 'react';
import { shallow } from 'enzyme';
import NavHeader from '../';

describe('Component', function () {
  describe('<NavHeader />', function () {
    it('Should call backToSearch action when clicking the left arrow', function (done) {
      const backToSearch = () => done();
      const wrapper = shallow(<NavHeader backToSearch={backToSearch}/>);
      wrapper.find('.backButton').simulate('click');
    });
  });
});
