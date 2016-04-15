import React from 'react';
import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ISearch from '../../src/components/isearch/';

const defaultProps = {
  tags: [],
  items: [],
  onYesFilter: () => {},
  onFilterClick: () => {},
  showAddMessage: () => {},
  hideAddMessage: () => {},
  filterVisibleState: {},
  fetchQuerySearchResults: () => {},
  removeTag: () => {}
};

describe('containers', function () {
  jsdom();
  const wrapper = shallow(<ISearch {...defaultProps} />);
  const children = wrapper.children().nodes;

  describe('<ISearch />', function () {
    it('should render our ISearch container', function (done) {
      expect(children).to.have.length(4);
      done();
    });
    it('should render our <SearchSummary /> as the first child', function (done) {
      const firstChild = children[0].type;
      const searchBar = wrapper.find('SearchSummary').node.type;
      expect(firstChild).to.deep.equal(searchBar);
      done();
    });
    it('should render our <SearchBar /> as the second child', function (done) {
      const secondChild = children[1].type;
      const searchSummary = wrapper.find('SearchBar').node.type;
      expect(secondChild).to.deep.equal(searchSummary);
      done();
    });
    it('should render our <TagContainer /> as the third child', function (done) {
      const thirdChild = children[2].type;
      const tags = wrapper.find('TagContainer').node.type;
      expect(thirdChild).to.deep.equal(tags);
      done();
    });
    it('should render our <SearchResults /> as the fourth child', function (done) {
      const fourthChild = children[3].type;
      const searchResults = wrapper.find('SearchResults').node.type;
      expect(fourthChild).to.deep.equal(searchResults);
      done();
    });
  });
});
