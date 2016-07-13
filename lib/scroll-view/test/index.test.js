import React from 'react';
import { mount } from 'enzyme';
import ScrollView from '../';
import expect from 'expect';

describe('<ScrollView /> Test', () => {
  it('Load data is called when nodeOffsetFromWindowBottom is less that the loading threshold', (done) => {
    const loadData = sinon.spy();
    const wrapper = mount(<ScrollView loadData={loadData}><p>Test</p></ScrollView>);
    const node = wrapper.find('div');
    node.node.offsetTop = 50;
    node.node.offsetHeight = 100;
    document.body.scrollTop = 100;
    window.innerHeight = 500;
    window.pageYOffset = 50;
    window.dispatchEvent(new window.UIEvent('scroll', { deltaY: 50 }));
    expect(loadData.callCount).toEqual(1);
    expect(loadData.lastCall.args).toEqual([1]);
    done();
  });
  it('Load data is not called when the nodeOffsetFromWindowBottom is greater that the loading threshold', (done) => {
    const loadData = sinon.spy();
    const wrapper = mount(<ScrollView loadData={loadData}><p>Test</p></ScrollView>);
    const node = wrapper.find('div');
    node.node.offsetTop = 50;
    node.node.offsetHeight = 800;  // scroll view already has lots of elements loaded
    document.body.scrollTop = 100;
    window.innerHeight = 500;
    window.pageYOffset = 50;
    window.dispatchEvent(new window.UIEvent('scroll', { deltaY: 10 }));
    expect(loadData.callCount).toEqual(0);
    done();
  });
});
