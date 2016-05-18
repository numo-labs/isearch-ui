import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DropDown from '../';

const props = {
  label: 'test',
  options: ['1', '2', '3'],
  width: '3em',
  optionsTitle: 'test',
  valueDefault: 'test'
};

describe('Component', function () {
  const wrapper = shallow(<DropDown {...props}/>);
  const children = wrapper.children().nodes;
  describe('DropDown', function () {
    it('should render our DropDown component', function (done) {
      expect(children).to.have.length(3);
      done();
    });
  });
});
