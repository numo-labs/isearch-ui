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
      expect(wrapper.find('div')).to.have.length(3);
      expect(wrapper.find('Link')).to.have.length(1);
      expect(wrapper.find('BetaFlag')).to.have.length(1);
      expect(wrapper.find('img')).to.have.length(1);
      done();
    });
    it('Should call go action when clicking the left arrow', function (done) {
      const go = () => done();
      const wrapper = shallow(<NavHeader go={go}/>);
      wrapper.find('.backButton').simulate('click');
    });
  });
});
