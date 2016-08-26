import React from 'react';
import { mount } from 'enzyme';
import SearchBar from '../';
import { expect } from 'chai';

const props = {
  addSingleTag: () => {},
  setSearchString: () => {},
  startSearch: () => {},
  departureDate: '01/01/2016',
  showTravelInfo: () => {},
  autocompleteOptions: [],
  getAutocompleteOptions: () => {},
  inAutoCompleteSearch: true,
  go: () => {}
};

describe('<SearchBar /> Component', () => {
  const wrapper = mount(<SearchBar {...props}/>);
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
  it('should render the correct content', (done) => {
    const leavingDate = wrapper.find('.leavingDate').text();
    const leavingDateChangeButton = wrapper.find('.leavingDateChangeButton').text();
    expect(leavingDate).to.equal('Tidigste afrejse: 01/01/2016');
    expect(leavingDateChangeButton).to.equal('Ændre');
    expect(wrapper.find('Autosuggest')).to.have.length(1);
    done();
  });
});
