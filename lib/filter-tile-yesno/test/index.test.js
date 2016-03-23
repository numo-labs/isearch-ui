import React from 'react';
import { shallow } from 'enzyme';
import Filter from '../';
import Description from '../description.js';
import { expect } from 'chai';

const filterProps = {
  description: {},
  color: '',
  yesFilter: () => {},
  noFilter: () => {},
  filterVisible: true,
  showAddMessage: () => {}
};

const descriptionProps = {
  description: {
    part1: '',
    bigWord: ''
  },
  yesFilter: () => {},
  noFilter: () => {},
  showAddMessage: () => {}
};

function setProps (props, defaultProps) {
  return {
    ...defaultProps,
    ...props
  };
}

describe('<Filter > component', () => {
  it('renders an empty div when the filterVisible prop is false', (done) => {
    const props = setProps({filterVisible: false}, filterProps);
    const wrapper = shallow(<Filter {...props}/>);
    expect(wrapper.find('div').length).to.equal(1);
    expect(wrapper.html()).to.equal('<div></div>');
    done();
  });
  it('Visibility of InfoText component is toggled by click events on the .questionMarkContainer div', (done) => {
    const props = setProps({}, filterProps);
    const wrapper = shallow(<Filter {...props}/>);
    expect(wrapper.find('.filterContainer').children().length).to.equal(2);
    expect(wrapper.find('InfoText').length).to.equal(0);
    wrapper.find('.questionMarkContainer').simulate('click');
    expect(wrapper.find('InfoText').length).to.equal(1);
    wrapper.find('.questionMarkContainer').simulate('click');
    expect(wrapper.find('InfoText').length).to.equal(0);
    done();
  });
  it('displays the Description component inside the .contentContainer div when the filterVisible prop is true', (done) => {
    const props = setProps({filterVisible: true}, filterProps);
    const wrapper = shallow(<Filter {...props}/>);
    const descriptionComponent = wrapper.find('Description').node.type;
    expect(wrapper.find('.contentContainer').children().nodes[0].type).to.deep.equal(descriptionComponent);
    done();
  });
});

describe('<Description > component', () => {
  it('Renders two elements with the class .filterButton', (done) => {
    const props = setProps({}, descriptionProps);
    const wrapper = shallow(<Description {...props}/>);
    expect(wrapper.find('.filterButton').length).to.equal(2);
    done();
  });
});
