import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../';
import { expect } from 'chai';

describe('<SearchBar /> Component', () => {
  const wrapper = shallow(<SearchBar />);
  it('Renders the search bar component', (done) => {
    const children = wrapper.children().nodes;
    expect(children).to.have.length(1);
    done();
  });
  // it('Renders a Autosuggest component', (done) => {
  //   const autosuggest = wrapper.find('Autosuggest');
  //   expect(autosuggest).to.have.length(1);
  //   done();
  // });
});
