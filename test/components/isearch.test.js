// Mocking window and document object:
require('../dom-mock.js')('<html><body></body></html>');

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import jsdom from 'mocha-jsdom';

import ISearch from '../../src/components/isearch/';

const defaultProps = {
  tags: [],
  displayedItems: [],
  onYesFilter: () => {},
  onFilterClick: () => {},
  showAddMessage: () => {},
  hideAddMessage: () => {},
  filterVisibleState: {},
  fetchQuerySearchResults: () => {},
  removeTag: () => {},
  addSingleTag: () => {},
  addTag: () => {}
};

describe('Component', function () {
  jsdom({ skipWindowCheck: true });
  describe('<ISearch /> Search view', function () {
    const wrapper = shallow(<ISearch {...defaultProps} />);
    const children = wrapper.children().nodes;

    it('should render the ISearch container', function (done) {
      expect(children).to.have.length(4);
      done();
    });
    it('should render the <SearchSummary /> as the first child', function (done) {
      const firstChild = children[0].type;
      const searchSummary = wrapper.find('SearchSummary').node.type;
      expect(firstChild).to.deep.equal(searchSummary);
      done();
    });
    it('should render the <Header /> as the second child', function (done) {
      const secondChild = children[1].type;
      const header = wrapper.find('Header').node.type;
      expect(secondChild).to.deep.equal(header);
      done();
    });
    it('should render the <TagContainer /> as the third child', function (done) {
      const thirdChild = children[2].type;
      const tags = wrapper.find('TagContainer').node.type;
      expect(thirdChild).to.deep.equal(tags);
      done();
    });
    it('should render the <ScrollView /> as the fourth child if the loading and error props are false', function (done) {
      const fourthChild = children[3].type;
      const scrollView = wrapper.find('ScrollView').node.type;
      expect(fourthChild).to.deep.equal(scrollView);
      done();
    });
    it('should render the <LoadingSpinner /> as the fourth child if the loading prop is true', function (done) {
      wrapper.setProps({loading: true});
      const children = wrapper.children().nodes;
      const fourthChild = children[3].type;
      expect(fourthChild).to.deep.equal('div');
      done();
    });
    it('should render a <div/> with class errorMessage as the fourth child if the loading prop is false but there is an error', function (done) {
      wrapper.setProps({loading: false, error: 'error'});
      const error = wrapper.find('.errorMessage');
      expect(error).to.have.length(1);
      done();
    });
    it('should render the <SearchBar /> as the third child if window.innerWidth is less than 553', function (done) {
      global.window.innerWidth = 550;
      const wrapper = shallow(<ISearch {...defaultProps} />);
      const children = wrapper.children().nodes;
      const thirdChild = children[2].type;
      const searchBar = wrapper.find('SearchBarContainer').node.type;
      expect(thirdChild).to.deep.equal(searchBar);
      done();
    });
  });
});
