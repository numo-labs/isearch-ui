import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import BetaFlag from '../';

describe('Component', function () {
  const wrapper = shallow(<BetaFlag />);
  const children = wrapper.children().nodes;
  it('should render our <BetaFlag /> component', function (done) {
    expect(children).to.have.length(1);
    done();
  });
  it('should render the correct child components', function (done) {
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('p')).to.have.length(1);
    done();
  });
});
