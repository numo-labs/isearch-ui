import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TagView from '../../src/components/tag-view';

describe('Components', function () {
  describe('<TagView />', function () {
    it('should render our TagView component', function (done) {
      const wrapper = shallow(<TagView />);
      const children = wrapper.children().nodes;
      expect(children).to.have.length(1);
      done();
    });
  });
});
