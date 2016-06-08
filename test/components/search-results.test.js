import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SearchResults from '../../src/components/search-results';
import PackageTile from '../../lib/package-tile';
import ArticleTile from '../../lib/article-tile';
import DestinationTile from '../../lib/destination-tile';
import FilterTile from '../../lib/filter-tile';
import mockTiles from '../../src/utils/mock-search-results';

describe('Component', function () {
  global.dataLayer = [];
  describe('<SearchResults />', function () {
    const wrapper = shallow(<SearchResults changeRoute={() => {}} items={mockTiles.items} viewedArticles={[]}/>);
    it('should render our SearchResults component', function (done) {
      const children = wrapper.children().nodes;
      expect(children).to.have.length(3);
      done();
    });
    it('should render 3 elements with the class .gridItem and none .visited', function (done) {
      expect(wrapper.find('.gridItem').length).to.equal(3);
      expect(wrapper.find('.visited').length).to.equal(0);
      done();
    });
    it('should render a PackageTile for items with a type of packageOffer', () => {
      expect(wrapper.find(PackageTile)).to.have.length(1);
    });
    it('should render an ArticleTile for tile items with a type of article', () => {
      expect(wrapper.find(ArticleTile)).to.have.length(1);
    });
    it('does not render an ArticleTile if the article item has no sections', () => {
      const sections = mockTiles.items[1].tile.sections;
      mockTiles.items[1].tile.sections = [];
      const wrapper = shallow(<SearchResults changeRoute={() => {}} items={mockTiles.items} viewedArticles={[]}/>);
      mockTiles.items[1].tile.sections = sections;
      expect(wrapper.find(ArticleTile)).to.have.length(0);
    });
    it('should render a DestinationTile for tile items with a type of destination', () => {
      mockTiles.items[1].tile.type = 'destination';
      const wrapper = shallow(<SearchResults changeRoute={() => {}} items={mockTiles.items} viewedArticles={[]}/>);
      mockTiles.items[1].tile.type = 'article';
      expect(wrapper.find(DestinationTile)).to.have.length(1);
    });
    it('does not render a DestinationTile if the destination item has no sections', () => {
      const sections = mockTiles.items[1].tile.sections;
      mockTiles.items[1].tile.type = 'destination';
      mockTiles.items[1].tile.sections = [];
      const wrapper = shallow(<SearchResults changeRoute={() => {}} items={mockTiles.items} viewedArticles={[]}/>);
      mockTiles.items[1].tile.type = 'article';
      mockTiles.items[1].tile.sections = sections;
      expect(wrapper.find(DestinationTile)).to.have.length(0);
    });
    it('should render a FilterTile for items with a type of filter', () => {
      expect(wrapper.find(FilterTile)).to.have.length(1);
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
