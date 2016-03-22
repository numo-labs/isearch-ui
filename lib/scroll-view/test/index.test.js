import React from 'react';
import { mount } from 'enzyme';
import jsdom from 'mocha-jsdom';
import ScrollView from '../';
import expect from 'expect';
import sinon from 'sinon';

describe('<ScrollView /> Test', () => {
  jsdom();

  it.only('Load data is called on scroll event', (done) => {
    const loadData = sinon.spy();
    const wrapper = mount(<ScrollView loadData={loadData}><p>Test</p></ScrollView>);
    const node = wrapper.find('div');
    node.offsetTop = 50;
    node.offsetHeight = 100;
    // console.log('SPY', loadData);
    document.body.scrollTop = 100;
    window.innerHeight = 500;
    window.pageYOffset = 50;

    window.dispatchEvent(new window.UIEvent('scroll', { deltaY: 500 }));
    expect(loadData.callCount).toEqual(1);
    done();
  });
});
