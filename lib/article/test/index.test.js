import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Article from '../';

describe('Component', function () {
  const wrapper = shallow(<Article />);
  const children = wrapper.children().nodes;
  describe('<Article />', function () {
    it('should render our Article component', function (done) {
      expect(children).to.have.length(3);
      done();
    });
  });
});
