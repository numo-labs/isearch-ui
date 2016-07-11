import React from 'react';
import { mount } from 'enzyme';
import SearchBar from '../';
import { expect } from 'chai';

describe('<SearchBar /> Component', () => {
  const wrapper = mount(<SearchBar />);
  it('Renders the search bar component', (done) => {
    const children = wrapper.children().nodes;
    expect(children).to.have.length(1);
    done();
  });
  it('Renders a Autosuggest component', (done) => {
    const autosuggest = wrapper.children().find('Autosuggest');
    expect(autosuggest).to.have.length(1);
    done();
  });
});
