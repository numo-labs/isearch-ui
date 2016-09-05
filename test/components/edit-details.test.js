import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import EditDetails from '../../src/components/edit-details';

const props = {
  departureDate: '01/01/2016',
  numberOfAdults: 2,
  numberOfChildren: 1,
  duration: '2 weeks',
  startSearch: () => {},
  setNumberOfChildren: () => {},
  setNumberOfAdults: () => {},
  childAge1: '3',
  childAge2: '4',
  childAge3: '5',
  childAge4: '6',
  setChildAge: () => {},
  setDepartureAirport: () => {},
  setDepartureDate: () => {},
  setDuration: () => {},
  departureAirport: 'Copenhagen - CPH',
  exitButtonClick: () => {},
  onSearchClick: () => {},
  go: () => {},
  updateHeaderTitles: () => {},
  hideTravelInfo: () => {}
};

describe('Component', function () {
  describe('<EditDetails />', function () {
    it('should render the correct content', function (done) {
      const wrapper = shallow(<EditDetails {...props}/>);
      const travelInfoTitle = wrapper.find('.travelInfoTitle').text();
      const changeInputButton = wrapper.find('.changeInputButton').text();
      expect(travelInfoTitle).to.equal('Ændre søgning');
      expect(changeInputButton).to.equal('Opdatér');
      expect(wrapper.find('DropDown')).to.have.length(5);
      expect(wrapper.find('Calendar')).to.have.length(1);
      done();
    });
  });
});
