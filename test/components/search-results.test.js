import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SearchResults from '../../src/components/search-results';
import mockTiles from '../../src/utils/mock-search-results';

describe('Component', function () {
  const wrapper = shallow(<SearchResults items={mockTiles.items} filterVisibleState={{'Wifi': true}} viewedArticles={[]}/>);
  const children = wrapper.children().nodes;
  describe('<SearchResults />', function () {
    it('should render our SearchResults component', function (done) {
      expect(children).to.have.length(3);
      done();
    });
    it('should render 3 elements with the class .gridItem', function (done) {
      expect(wrapper.find('.gridItem').length).to.equal(3);
      done();
    });
  });
});
