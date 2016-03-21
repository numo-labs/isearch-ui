'use strict';

import React, { Component, PropTypes } from 'react';

function findNodeOffsetFromWindowTop(node) {
  if (!node) { //offsetParent of the body node is null
    return 0;
  }
  return node.offsetTop + findNodeOffsetFromWindowTop(node.offsetParent);
}

class ScrollView extends Component {

  constructor () {
    super();
    this._scrollHandler = this._scrollHandler.bind(this);
    this.page = 0; // to keep track of the current page to enable pagination. Dont' want to re-render on page change so just set it on `this` instead of a state
  }

  componentDidMount () {
    this._attachScrollListeners()
  }

  _attachScrollListeners () {
    ['scroll', 'resize'].map((e) => window.addEventListener(e, this._scrollHandler) )
  }

  _removeScrollListeners () {
    ['scroll', 'resize'].map((e) => window.removeEventListener(e))
  }

  _scrollHandler () {
    const { loadingThreshold, loadData, endScroll } = this.props;
    const node = this._scrollView;
    const nodeHeight = node.offsetHeight; //height of the element
    const nodeOffsetFromWindowTop = findNodeOffsetFromWindowTop(node); //y displacement of the top of the node from the top of the window
    const pageYScrollPosition = window.pageYOffset; // scroll position of the top of the page from the top of the window
    const viewportHeight = window.innerHeight; //height of the viewport
    const nodeOffsetFromWindowBottom = nodeOffsetFromWindowTop + nodeHeight - pageYScrollPosition - viewportHeight; //offset of the node from the bottom of the window
    if (!endScroll && nodeOffsetFromWindowBottom < loadingThreshold) { //almost reached the bottom of the scrollView container so call the loadData function prop
      this.page +=1;
      loadData(this.page);
    }
  }

  componentWillUnmount () {
    this._removeScrollListeners();
  }

  render () {
    return (
      <div ref={(ref) => this._scrollView = ref}>
        {this.props.children}
      </div>
    )
  }
}

ScrollView.defaultProps = {
  loadingThreshold: 250,
  endScroll: false,
  loadData: () => console.log('Pass in a function to load more data given a page number')
}

ScrollView.PropTypes = {
  loadingThreshold: PropTypes.string,
  loadData: PropTypes.func,
  endScroll: PropTypes.bool
}

export default ScrollView;
