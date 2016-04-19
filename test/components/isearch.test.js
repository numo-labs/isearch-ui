import React from 'react';
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

const articleViewProps = {
  fetchQuerySearchResults: () => {},
  articlePage: true,
  articleContent: {
    sections: []
  },
  backToSearch: () => {}
};

describe('Component', function () {
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
    it('should render the <SearchResults /> as the fourth child if the loading and error props are false', function (done) {
      const fourthChild = children[3].type;
      const searchResults = wrapper.find('SearchResults').node.type;
      expect(fourthChild).to.deep.equal(searchResults);
      done();
    });
    it('should render the <LoadingSpinner /> as the fourth child if the loading prop is true', function (done) {
      wrapper.setProps({loading: true});
      const children = wrapper.children().nodes;
      const fourthChild = children[3].type;
      const spinner = wrapper.find('LoadingSpinner').node.type;
      expect(fourthChild).to.deep.equal(spinner);
      done();
    });
    it('should render a <div/> with class errorMessage as the fourth child if the loading prop is false but there is an error', function (done) {
      wrapper.setProps({loading: false, error: 'error'});
      const error = wrapper.find('.errorMessage');
      expect(error).to.have.length(1);
      done();
    });
  });
  describe('<ISearch /> Search view', function () {
    const wrapper = shallow(<ISearch {...articleViewProps} />);
    it('should display ArticleFullPage if there are article data', function (done) {
      expect(wrapper.find('ArticleFullPage')).to.have.length(1);
      done();
    });
  });
});
