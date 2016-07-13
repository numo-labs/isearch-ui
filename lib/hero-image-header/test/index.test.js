import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Header from '../';

describe('Component', function () {
  describe('<Header />', function () {
    it('Should render Header component', function (done) {
      const wrapper = shallow(<Header displayedItems={[]}/>);
      expect(wrapper.find('.headerBarWrapper')).to.have.length(1);
      done();
    });
    it('should not render the bouncing arrow if there are no displayedItems', function (done) {
      const wrapper = shallow(<Header displayedItems={[]} />);
      expect(wrapper.find('.bouncingArrow')).to.have.length(0);
      done();
    });
    it('should render the bouncing arrow if there are displayedItems', function (done) {
      const wrapper = shallow(<Header displayedItems={['test']} />);
      expect(wrapper.find('.bouncingArrow')).to.have.length(1);
      done();
    });
  });
});
