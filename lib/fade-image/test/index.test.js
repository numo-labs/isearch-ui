import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import FadeImage from '../';

const props = {
  isBackground: true
};

describe('Component', function () {
  describe('<FadeImage />', function () {
    it('should render a div if isBackground prop is true', function (done) {
      const wrapper = shallow(<FadeImage {...props} />);
      expect(wrapper.find('div')).to.have.length(1);
      expect(wrapper.find('img')).to.have.length(0);
      done();
    });
    it('should render an img if isBackground prop is false', function (done) {
      const wrapper = shallow(<FadeImage isBackground={false} />);
      expect(wrapper.find('img')).to.have.length(1);
      expect(wrapper.find('div')).to.have.length(0);
      done();
    });
  });
});
