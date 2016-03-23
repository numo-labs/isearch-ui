import React from 'react';
import { shallow } from 'enzyme';
import Filter from '../';
import Description from '../description.js';
import { expect } from 'chai';
import sinon from 'sinon';

const defaultProps = {
  description: {
    part1: '',
    bigWord: ''
  },
  yesFilter: () => {},
  noFilter: () => {},
  showAddMessage: () => {}
};

function setProps (props) {
  return {
    ...defaultProps,
    ...props
  };
}

describe('<Description /> Component', () => {
  const props = setProps({});
  const wrapper = shallow(<Description {...props}/>);

  it('Renders two elements with the class .filterButton', (done) => {
    expect(wrapper.find('.filterButton').length).to.equal(2);
    done();
  });
  it('yesfilter function is called when the first div with .filterButton class is clicked', (done) => {
    const yesFilter = sinon.spy();
    const noFilter = sinon.spy();
    const props = setProps({yesFilter, noFilter});
    const wrapper = shallow(<Description {...props}/>);
    wrapper.find('.filterButton').first().simulate('click');
    expect(yesFilter.callCount).to.equal(1);
    expect(noFilter.callCount).to.equal(0);
    done();
  });
  it('nofilter function is called when the second div with .filterButton class is clicked', (done) => {
    const yesFilter = sinon.spy();
    const noFilter = sinon.spy();
    const props = setProps({yesFilter, noFilter});
    const wrapper = shallow(<Description {...props}/>);
    wrapper.find('.filterButton').last().simulate('click');
    expect(yesFilter.callCount).to.equal(0);
    expect(noFilter.callCount).to.equal(1);
    done();
  });
  it('renders three child components', (done) => {
    expect(wrapper.children().length).to.equal(3);
    done();
  });
});
