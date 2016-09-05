import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Header from '../';

const props = {
  searchBar: true
};

describe('Component', function () {
  const wrapper = shallow(<Header displayedItems={[]} {...props}/>);
  describe('<Header />', function () {
    it('Should render Header component', function (done) {
      expect(wrapper.find('.headerBarWrapper')).to.have.length(1);
      done();
    });
    it('should render the correct content', function (done) {
      const heroTitle = wrapper.find('.spies').text();
      const searchBar = wrapper.find('.headerSearchBar');
      expect(heroTitle).to.equal('Lad os inspirere dig');
      expect(searchBar).to.have.length(1);
      done();
    });
  });
});
