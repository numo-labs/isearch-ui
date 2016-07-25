'use strict';

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ISearch from '../../src/components/isearch/';

const defaultProps = {
  tags: [],
  displayedItems: [],
  onYesFilter: () => {},
  onFilterClick: () => {},
  showAddMessage: () => {},
  hideAddMessage: () => {},
  fetchQuerySearchResults: () => {},
  removeTag: () => {},
  addSingleTag: () => {},
  addTag: () => {},
  resetTags: () => {}
};

describe('Component', function () {
  describe('<ISearch /> Search view', function () {
    let wrapper, children;

    beforeEach(() => {
      window.innerWidth = 800;
      global.dataLayer = [];
      wrapper = shallow(<ISearch {...defaultProps} />);
      children = wrapper.children().nodes;
    });

    it('should render the ISearch container', function (done) {
      expect(children).to.have.length(3);
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
    it('should render the <ScrollView /> as the third child if the loading and error props are false', function (done) {
      const thirdChild = children[2].type;
      const scrollView = wrapper.find('ScrollView').node.type;
      expect(thirdChild).to.deep.equal(scrollView);
      done();
    });
    it('should render the <LoadingSpinner /> as the third child if the loading prop is true', function (done) {
      wrapper.setProps({loading: true});
      const children = wrapper.children().nodes;
      const thirdChild = children[2].type;
      expect(thirdChild).to.deep.equal('div');
      done();
    });
    it('should render a <div/> with class errorMessage as the fourth child if the loading prop is false but there is an error', function (done) {
      wrapper.setProps({loading: false, error: 'error'});
      const error = wrapper.find('.errorMessage');
      expect(error).to.have.length(1);
      done();
    });
  });
});
