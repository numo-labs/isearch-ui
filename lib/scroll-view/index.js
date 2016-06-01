'use strict';

/**
*
* INFINITE SCROLL COMPONENT
*
* Wrapper which listens for scroll events and checks the position of itself
* relative to the window
*
* When the offset of the bottom of the element from the bottom of the viewport is
* less than a specified threshold, the loadData function prop is called
*
* The endScroll prop can be used to stop further data fetching when no more
* data is available
*
*/

import React, { Component, PropTypes } from 'react';

function findNodeOffsetFromWindowTop (node) {
  if (!node) { // offsetParent of the body node is null
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
    this._attachScrollListeners();
  }

  _attachScrollListeners () {
    ['scroll', 'resize'].map((e) => window.addEventListener(e, this._scrollHandler));
  }

  _removeScrollListeners () {
    ['scroll', 'resize'].map((e) => window.removeEventListener(e, this._scrollHandler));
  }

  componentDidUpdate () {
    this._attachScrollListeners();
  }

  _scrollHandler () {
    const { loadingThreshold, loadData, endScroll } = this.props;
    const node = this._scrollView;
    const nodeHeight = node.offsetHeight; // height of the element
    const nodeOffsetFromWindowTop = findNodeOffsetFromWindowTop(node); // y displacement of the top of the node from the top of the window
    const pageYScrollPosition = window.pageYOffset; // scroll position of the top of the page from the top of the window
    const viewportHeight = window.innerHeight; // height of the viewport
    const nodeOffsetFromWindowBottom = nodeOffsetFromWindowTop + nodeHeight - pageYScrollPosition - viewportHeight; // offset of the node from the bottom of the window
    if (!endScroll && (nodeOffsetFromWindowBottom < loadingThreshold)) { // almost reached the bottom of the scrollView container so call the loadData function prop
      // remove the scroll listener until the component has updated to prevent unecessary calls to the load more function before new data has been loaded
      // scroll listeners added back on componentDidUpdate
      this._removeScrollListeners();
      this.page += 1;
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
    );
  }
}

ScrollView.defaultProps = {
  loadingThreshold: 200,
  endScroll: false,
  loadData: () => console.log('Pass in a function to load more data given a page number')
};

ScrollView.propTypes = {
  loadingThreshold: PropTypes.number,
  loadData: PropTypes.func,
  endScroll: PropTypes.bool,
  children: PropTypes.object
};

export default ScrollView;
