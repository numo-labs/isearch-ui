import React from 'react';
import { shallow } from 'enzyme';
import Filter from '../';
import { expect } from 'chai';

const defaultProps = {
  description: {},
  color: '',
  yesFilter: () => {},
  noFilter: () => {},
  filterVisible: true,
  showAddMessage: () => {}
};

function setProps (props) {
  return {
    ...defaultProps,
    ...props
  };
}

describe('<FilterTile /> Component', () => {
  it('renders an empty div when the filterVisible prop is false', (done) => {
    const props = setProps({filterVisible: false});
    const wrapper = shallow(<Filter {...props}/>);
    expect(wrapper.find('div').length).to.equal(1);
    expect(wrapper.html()).to.equal('<div></div>');
    done();
  });
  it('Visibility of InfoText component is toggled by click events on the .questionMarkContainer div', (done) => {
    const props = setProps({});
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
    const props = setProps({filterVisible: true});
    const wrapper = shallow(<Filter {...props}/>);
    const descriptionComponent = wrapper.find('Description').node.type;
    expect(wrapper.find('.contentContainer').children().nodes[0].type).to.deep.equal(descriptionComponent);
    done();
  });
});
