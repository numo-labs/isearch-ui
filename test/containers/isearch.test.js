import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'mocha-jsdom';
import { expect} from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import ISearch from '../../src/containers/isearch';

describe('containers', function () {
  jsdom();
  const wrapper = shallow(<ISearch />);
  const children = wrapper.children().nodes;

  describe('<ISearch />', function () {
    it('should render our ISearch container', function (done) {
      expect(children).to.have.length(2);
      done();
    });
    it('should render our <SearchBar /> as the first child', function (done) {
      expect(children[0].type).to.deep.equal(wrapper.find('SearchBar').node.type);
      done();
    });
    it('should render our <SearchSummary /> as the second child', function (done) {
      expect(children[1].type).to.deep.equal(wrapper.find('SearchSummary').node.type);
      done();
    });
  })
});
