import React from 'react';
import { mount } from 'enzyme';
import ScrollView from '../';
import expect from 'expect';

describe('<ScrollView /> Test', () => {
  beforeEach(() => {
    document.body.scrollTop = 100;
    window.innerHeight = 500;
    window.pageYOffset = 50;
  });
  it('Load data is called when nodeOffsetFromWindowBottom is less that the loading threshold', (done) => {
    const loadData = sinon.stub();
    const getNodeOffset = sinon.stub().returns(100);
    mount(<ScrollView loadData={loadData} getNodeOffset={getNodeOffset}><p>Test</p></ScrollView>);
    window.dispatchEvent(new window.Event('scroll', { deltaY: 50 }));
    expect(loadData.callCount).toEqual(1);
    expect(loadData.lastCall.args).toEqual([1]);
    done();
  });
  it('Load data is not called when the nodeOffsetFromWindowBottom is greater that the loading threshold', (done) => {
    const loadData = sinon.spy();
    const getNodeOffset = sinon.stub().returns(900);
    mount(<ScrollView loadData={loadData} getNodeOffset={getNodeOffset}><p>Test</p></ScrollView>);
    window.dispatchEvent(new window.Event('scroll', { deltaY: 10 }));
    expect(loadData.callCount).toEqual(0);
    done();
  });
});
