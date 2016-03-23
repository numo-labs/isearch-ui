import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Tags from '../';
import Tag from '../tag.js';

describe('<Tags /> Component', () => {
  it('the number of <Tag /> components is determined by the length of the tags array prop', (done) => {
    const tagsProps = {
      tags: [{tagName: '', color: ''}, {tagName: '', color: ''}],
      removeTag: () => {}
    };
    const wrapper = shallow(<Tags {...tagsProps}/>);
    expect(wrapper.find('Tag').nodes.length).to.equal(tagsProps.tags.length);
    done();
  });
});

describe('<Tag /> Component', () => {
  it('The removeTag function is called when the div with class .cross is clicked', (done) => {
    const tagProps = {
      tagName: '',
      colour: '',
      removeTag: sinon.spy()
    }
    const wrapper = shallow(<Tag {...tagProps}/>);
    wrapper.find('.cross').simulate('click');
    expect(tagProps.removeTag.callCount).to.equal(1);
    done();
  });
});
