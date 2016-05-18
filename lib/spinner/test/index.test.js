import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../';
import { expect } from 'chai';

describe('<Spinner /> Component', () => {
  const wrapper = shallow(<Spinner />);
  it('Renders the spinner component with two divs with classnames cube1 and cube2', (done) => {
    const children = wrapper.children().nodes;
    expect(children).to.have.length(2);
    const cube1 = wrapper.find('.cube1');
    const cube2 = wrapper.find('.cube2');
    expect(cube1).length(1);
    expect(cube2).length(1);
    done();
  });
});
