import React from 'react';
import { shallow } from 'enzyme';
import Filter from '../';
import { expect } from 'chai';
import InfoText from '../infoText.js';

const defaultProps = {
  description: {
    prefix: 'Do you need access to',
    label: 'Internet',
    tagid: 'amenity:wifi'
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

describe('<FilterTile /> Component', () => {
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
  it('displays the Description component inside the .contentContainer div', (done) => {
    const props = setProps({});
    const wrapper = shallow(<Filter {...props}/>);
    const descriptionComponent = wrapper.find('Description').node.type;
    expect(wrapper.find('.contentContainer').children().nodes[0].type).to.deep.equal(descriptionComponent);
    done();
  });
});

describe('<InfoText /> Component', () => {
  it('renders a single div with class .bubble', (done) => {
    const wrapper = shallow(<InfoText />);
    expect(wrapper.find('.bubble').length).to.equal(1);
    expect(wrapper.find('div').length).to.equal(1);
    done();
  });
});
