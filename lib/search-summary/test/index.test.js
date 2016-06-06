import React from 'react';
import { shallow } from 'enzyme';
import SearchSummary from '../';
import { expect } from 'chai';

describe('<SearchSummary /> Component', () => {
  const wrapper = shallow(<SearchSummary />);
  it('When the scrollY position is less than a quater of the window height the Search Summary Component should not be visible', (done) => {
    const children = wrapper.children().nodes;
    expect(children).to.have.length(0);
    done();
  });
  it('When the visibleTab state is set to header the searchSummaryHeader component should be the only child', (done) => {
    wrapper.setState({visibleTab: 'header'});
    const children = wrapper.children().nodes;
    const firstChild = children[0].type;
    const searchSummaryHeader = wrapper.find('SearchSummaryHeader').node.type;
    expect(children).to.have.length(1);
    expect(firstChild).to.deep.equal(searchSummaryHeader);
    done();
  });
});
