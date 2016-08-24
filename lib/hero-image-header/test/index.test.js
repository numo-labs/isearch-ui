import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Header from '../';

describe('Component', function () {
  const wrapper = shallow(<Header displayedItems={[]}/>);
  describe('<Header />', function () {
    it('Should render Header component', function (done) {
      expect(wrapper.find('.headerBarWrapper')).to.have.length(1);
      done();
    });
    it('should render the correct children', function (done) {
      expect(wrapper.find('div')).to.have.length(3);
      expect(wrapper.find('h1')).to.have.length(1);
      done();
    });
  });
});
