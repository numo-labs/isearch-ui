import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SearchResults from '../../src/components/search-results';
import PackageTile from '../../lib/package-tile';
import ArticleTile from '../../lib/article-tile';
import DestinationTile from '../../lib/destination-tile';
import FilterTile from '../../lib/filter-tile';
import VisibilitySensor from 'react-visibility-sensor';
import mockTiles from '../../src/utils/mock-search-results';
import sinon from 'sinon';

describe('Component', function () {
  global.dataLayer = [];
  describe('<SearchResults />', function () {
    const removeStub = sinon.stub();
    const wrapper = shallow(<SearchResults changeRoute={() => {}} items={mockTiles.items} viewedArticles={[]} removeTile={removeStub} />);
    beforeEach(() => {
      removeStub.reset();
      global.dataLayer = [];
    });
    it('should render our SearchResults component', function (done) {
      const children = wrapper.children().nodes;
      expect(children).to.have.length(1);
      done();
    });
    it('should render 4 elements with the class .gridItem and none .visited', function (done) {
      expect(wrapper.find('.gridItem').length).to.equal(4);
      expect(wrapper.find('.visited').length).to.equal(0);
      done();
    });
    it('should wrap each tile in a VisibilitySensor component', () => {
      expect(wrapper.find(VisibilitySensor).length).to.equal(4);
    });
    it('pushes an event to the dataLayer when a tile becomes visible', () => {
      wrapper.find(VisibilitySensor).first().simulate('change', true);
      expect(dataLayer.length).to.equal(1);
      expect(dataLayer[0].event).to.equal('impressionsPushed');
    });
    it('sets the impression id to the package reference for package tile impressions', () => {
      wrapper.find(VisibilitySensor).first().simulate('change', true);
      expect(dataLayer.length).to.equal(1);
      expect(dataLayer[0].ecommerce.impressions[0].id).to.equal('A01A37');
    });
    it('sets the impression id to the filter id for filter tile impressions', () => {
      wrapper.find(VisibilitySensor).at(3).simulate('change', true);
      expect(dataLayer.length).to.equal(1);
      expect(dataLayer[0].ecommerce.impressions[0].id).to.equal('amenity:wifi');
    });
    it('should render a PackageTile for items with a type of packageOffer', () => {
      expect(wrapper.find(PackageTile)).to.have.length(1);
    });
    it('package result tile contains a remove button', () => {
      const wrapper = shallow(<SearchResults changeRoute={() => {}} items={mockTiles.items.slice(0, 1)} viewedArticles={[]} removeTile={removeStub} />);
      expect(wrapper.find('.removeTileButton').length).to.equal(1);
      wrapper.find('.removeTileButton').parent().simulate('click');
      expect(removeStub.called).to.be.true;
      expect(removeStub.calledWith('e73e4919e237887f70f6024011502243')).to.be.true;
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
    it('article result tile contains a remove button', () => {
      const wrapper = shallow(<SearchResults changeRoute={() => {}} items={mockTiles.items.slice(1, 2)} viewedArticles={[]} removeTile={removeStub} />);
      expect(wrapper.find('.removeTileButton').length).to.equal(1);
      wrapper.find('.removeTileButton').parent().simulate('click');
      expect(removeStub.called).to.be.true;
      expect(removeStub.calledWith('1461583539892')).to.be.true;
    });
    it('should render a DestinationTile for tile items with a type of destination', () => {
      const wrapper = shallow(<SearchResults changeRoute={() => {}} items={mockTiles.items} viewedArticles={[]}/>);
      expect(wrapper.find(DestinationTile)).to.have.length(1);
    });
    it('does not render a DestinationTile if the destination item has no sections', () => {
      const sections = mockTiles.items[2].tile.sections;
      mockTiles.items[2].tile.sections = [];
      const wrapper = shallow(<SearchResults changeRoute={() => {}} items={mockTiles.items} viewedArticles={[]}/>);
      mockTiles.items[2].tile.sections = sections;
      expect(wrapper.find(DestinationTile)).to.have.length(0);
    });
    it('destination result tile contains a remove button', () => {
      const wrapper = shallow(<SearchResults changeRoute={() => {}} items={mockTiles.items.slice(2, 3)} viewedArticles={[]} removeTile={removeStub} />);
      expect(wrapper.find('.removeTileButton').length).to.equal(1);
      wrapper.find('.removeTileButton').parent().simulate('click');
      expect(removeStub.called).to.be.true;
      expect(removeStub.calledWith('1461583539893')).to.be.true;
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
              brand: 'hotel_tile',
              dimension11: 'destCode',
              dimension12: 'destName',
              dimension13: 'depCode'
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
