import React from 'react';
import { shallow } from 'enzyme';
import SearchSummary from '../';
import { expect } from 'chai';

describe('<SearchSummary /> Component', () => {
  const wrapper = shallow(<SearchSummary />);
  const children = wrapper.children().nodes;
  it('it should render our SearchSummary component', (done) => {
    expect(children).to.have.length(1);
    done();
  });
});
