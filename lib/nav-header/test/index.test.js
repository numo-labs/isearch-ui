import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import NavHeader from '../';

describe('Component', function () {
  describe('<NavHeader />', function () {
    it('should render our NavHeader component', function (done) {
      const wrapper = shallow(<NavHeader />);
      const children = wrapper.children().nodes;
      expect(children).to.have.length(2);
      done();
    });
    it('should render the correct children', function (done) {
      const wrapper = shallow(<NavHeader />);
      const navBackButtonText = wrapper.find('.navBackButtonText').text();
      expect(navBackButtonText).to.equal('Tilbage');
      done();
    });
    it('Should call go action when clicking the left arrow', function (done) {
      const go = () => done();
      const wrapper = shallow(<NavHeader go={go}/>);
      wrapper.find('.backButton').simulate('click');
    });
  });
});
