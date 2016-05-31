import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Tags, { DEFAULT_TAG_ID } from '../';
import Tag from '../tag.js';

chai.use(sinonChai);

describe('<Tags /> Component', () => {
  it('the number of <Tag /> components is determined by the length of the tags array prop', (done) => {
    const tagsProps = {
      tags: [{tagName: '', color: '', id: 'geo:12345'}, {tagName: '', color: '', id: 'amenity:12345'}],
      removeTag: () => {}
    };
    const wrapper = shallow(<Tags {...tagsProps}/>);
    expect(wrapper.find('Tag').nodes.length).to.equal(tagsProps.tags.length);
    done();
  });

  describe('reset button', () => {
    const tagsProps = {
      tags: [ { tagName: '', color: '', id: 'amenity:12345' } ],
      removeTag: () => {},
      resetTags: () => {}
    };
    it('is hidden if the only tag is the default tag', (done) => {
      const props = {
        ...tagsProps,
        tags: [ { tagName: 'default', color: '', id: DEFAULT_TAG_ID } ]
      };
      const wrapper = shallow(<Tags {...props}/>);
      expect(wrapper.find('.resetButton').node.props.className).to.contain('hidden');
      done();
    });
    it('is shown if the non-default tags are present', (done) => {
      const props = {
        ...tagsProps,
        tags: [ { tagName: 'not-default', color: '', id: 'amenity:12345' } ]
      };
      const wrapper = shallow(<Tags {...props}/>);
      expect(wrapper.find('.resetButton').node.props.className).to.not.contain('hidden');
      done();
    });
    it('resets the tags to only the default tag when clicked', (done) => {
      const props = {
        ...tagsProps,
        resetTags: sinon.stub()
      };
      const wrapper = shallow(<Tags {...props}/>);
      wrapper.find('.resetButton').simulate('click');
      expect(props.resetTags).to.have.been.calledWith('Top inspiration', DEFAULT_TAG_ID);
      done();
    });
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
