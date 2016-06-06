import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SearchResults from '../../src/components/search-results';
import mockTiles from '../../src/utils/mock-search-results';

describe('Component', function () {
  global.dataLayer = [];
  const wrapper = shallow(<SearchResults changeRoute={() => {}} items={mockTiles.items} filterVisibleState={{'Wifi': true}} viewedArticles={[]}/>);
  const children = wrapper.children().nodes;
  describe('<SearchResults />', function () {
    it('should render our SearchResults component', function (done) {
      expect(children).to.have.length(3);
      done();
    });
    it('should render 3 elements with the class .gridItem and none .visited', function (done) {
      expect(wrapper.find('.gridItem').length).to.equal(3);
      expect(wrapper.find('.visited').length).to.equal(0);
      done();
    });
    it('should add a click analytics event if a package is clicked', function (done) {
      global.dataLayer = [];
      const expectedDataLayer = [{
        event: 'productClick',
        ecommerce: {
          click: {
            actionField: { list: 'inspirational search feed' },
            products: [{
              id: 'A01A37',
              brand: 'hotel_tile'
            }]
          }
        }
      }];
      wrapper.find('.clickable').first().simulate('click');
      expect(global.dataLayer).to.deep.equal(expectedDataLayer);
      done();
    });
    it('should render a articles as visited if the Id is at visitedArticles array', function (done) {
      const wrapper2 = shallow(<SearchResults changeRoute={() => {}} items={mockTiles.items} filterVisibleState={{'Wifi': true}} viewedArticles={['tile:article.HyVj2zA']}/>);
      expect(wrapper2.find('.visited').length).to.equal(1);
      done();
    });
  });
});
