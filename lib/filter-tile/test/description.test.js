import React from 'react';
import { shallow } from 'enzyme';
import Description from '../description.js';
import { expect } from 'chai';
import sinon from 'sinon';

const defaultProps = {
  description: {
    part1: '',
    bigWord: ''
  },
  onYesFilter: () => {},
  onNoFilter: () => {},
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
  beforeEach(function (done) {
    global.dataLayer = [];
    done();
  });
  afterEach(function (done) {
    delete global.dataLayer;
    done();
  });

  it('Renders two elements with the class .filterButton', (done) => {
    expect(wrapper.find('.filterButton').length).to.equal(2);
    done();
  });
  it('Renders one element with the class .descriptionTextContainer', function (done) {
    expect(wrapper.find('.descriptionTextContainer').length).to.equal(1);
    done();
  });
  it('yesfilter function is called when the first div with .filterButton class is clicked', (done) => {
    const onYesFilter = sinon.spy();
    const onNoFilter = sinon.spy();
    const props = setProps({onYesFilter, onNoFilter});
    const wrapper = shallow(<Description {...props}/>);
    wrapper.find('.filterButton').first().simulate('click');
    expect(onYesFilter.callCount).to.equal(1);
    expect(onNoFilter.callCount).to.equal(0);
    done();
  });
  it('nofilter function is called when the second div with .filterButton class is clicked', (done) => {
    const onYesFilter = sinon.spy();
    const onNoFilter = sinon.spy();
    const props = setProps({onYesFilter, onNoFilter});
    const wrapper = shallow(<Description {...props}/>);
    wrapper.find('.filterButton').last().simulate('click');
    expect(onYesFilter.callCount).to.equal(0);
    expect(onNoFilter.callCount).to.equal(1);
    done();
  });
  it('renders three child components', (done) => {
    expect(wrapper.children().length).to.equal(3);
    done();
  });
});
