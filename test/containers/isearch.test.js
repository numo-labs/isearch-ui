import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'mocha-jsdom';
import { expect} from 'chai';
import { shallow } from 'enzyme';

import ISearch from '../../src/containers/isearch';

describe('containers', function () {
  jsdom();
  const wrapper = shallow(<ISearch />);
  const children = wrapper.children().nodes;

  describe('<ISearch />', function () {
    it('should render our ISearch container', function (done) {
      expect(children).to.have.length(3);
      done();
    });
    it('should render our <SearchBar /> as the first child', function (done) {
      const firstChild = children[0].type;
      const searchBar = wrapper.find('SearchBar').node.type;
      expect(firstChild).to.deep.equal(searchBar);
      done();
    });
    it('should render our <SearchSummary /> as the second child', function (done) {
      const secondChild = children[1].type;
      const searchSummary = wrapper.find('SearchSummary').node.type;
      expect(secondChild).to.deep.equal(searchSummary);
      done();
    });
    it('should render our <Tags /> as the third child', function (done) {
      const thirdChild = children[2].type;
      const tags = wrapper.find('Tags').node.type;
      expect(thirdChild).to.deep.equal(tags);
      done();
    });
  });
});
