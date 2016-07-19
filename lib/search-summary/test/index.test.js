import React from 'react';
import { shallow } from 'enzyme';
import SearchSummary from '../';
import { expect } from 'chai';

describe('<SearchSummary /> Component', () => {
  const wrapper = shallow(<SearchSummary />);
  it('When the scrollY position is less than a quater of the window height the Search Summary Component should not be visible (beta flag should)', (done) => {
    const children = wrapper.children().nodes;
    expect(children).to.have.length(1);
    done();
  });
  it('When the visible state is set to true the searchSummaryHeader component should be the first child prior beta flag', (done) => {
    wrapper.setState({visible: true});
    const children = wrapper.children().nodes;
    const firstChild = children[0].type;
    const searchSummaryHeader = wrapper.find('SearchSummaryHeader').node.type;
    expect(children).to.have.length(2);
    expect(firstChild).to.deep.equal(searchSummaryHeader);
    done();
  });
});
