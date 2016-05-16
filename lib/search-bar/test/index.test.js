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
  it('Renders a Typeahead component and a search button', (done) => {
    const typeahead = wrapper.find('Typeahead');
    const searchButton = wrapper.find('.searchButton');
    expect(typeahead).to.have.length(1);
    expect(searchButton).to.have.length(1);
    done();
  });
});
