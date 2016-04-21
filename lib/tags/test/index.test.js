import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import jsdom from 'mocha-jsdom';

import Tags from '../';
import Tag from '../tag.js';

describe('<Tags /> Component', () => {
  jsdom();
  it('the number of <Tag /> components is determined by the length of the tags array prop', (done) => {
    const tagsProps = {
      tags: [{tagName: '', color: '', id: 'geo:12345'}, {tagName: '', color: '', id: 'amenity:12345'}],
      removeTag: () => {}
    };
    const wrapper = shallow(<Tags {...tagsProps}/>);
    expect(wrapper.find('Tag').nodes.length).to.equal(tagsProps.tags.length);
    done();
  });
});

describe('<Tag /> Component', () => {
  const tagProps = {
    tagName: '',
    colour: '',
    removeTag: () => {}
  };

  it('The removeTag function is called when the div with class .cross is clicked', (done) => {
    const props = {
      ...tagProps,
      removeTag: sinon.spy()
    };
    const wrapper = shallow(<Tag {...props}/>);
    wrapper.find('.cross').simulate('click');
    expect(props.removeTag.callCount).to.equal(1);
    done();
  });
  it('has two children', (done) => {
    const wrapper = shallow(<Tag {...tagProps}/>);
    expect(wrapper.children().nodes.length).to.equal(2);
    done();
  });
});
