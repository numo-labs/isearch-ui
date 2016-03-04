import React from 'react';
import Masonry from 'masonry-layout';
import imagesloaded from 'imagesloaded';

let refName = 'masonryContainer';

export default class MasonryGrid extends React.Component {
  constructor () {
    super();
    this.masonry = false;
    this.domChildren = [];
  }

  initializeMasonry (force) {
    if (!this.masonry || force) {
      this.masonry = new Masonry(
        this.refs[refName],
        this.props.options
      );

      this.domChildren = this.getNewDomChildren();
    }
  }

  getNewDomChildren () {
    let node = this.refs[refName];
    let children = this.props.options.itemSelector ? node.querySelectorAll(this.props.options.itemSelector) : node.children;
    return Array.prototype.slice.call(children);
  }

  diffDomChildren () {
    let oldChildren = this.domChildren.filter(element => {
      return !!element.parentNode;
    });

    let newChildren = this.getNewDomChildren();

    let removed = oldChildren.filter(oldChild => {
      return !~newChildren.indexOf(oldChild);
    });

    let domDiff = newChildren.filter(newChild => {
      return !~oldChildren.indexOf(newChild);
    });

    let beginningIndex = 0;

    let prepended = domDiff.filter((newChild, i) => {
      let prepend = (beginningIndex === newChildren.indexOf(newChild));

      if (prepend) {
        // increase the index
        beginningIndex++;
      }

      return prepend;
    });

    // we assume that everything else is appended
    let appended = domDiff.filter(el => {
      return prepended.indexOf(el) === -1;
    });

    // get everything added to the end of the DOMNode list
    let moved = [];

    if (removed.length === 0) {
      moved = oldChildren.filter((child, index) => {
        return index !== newChildren.indexOf(child);
      });
    }

    this.domChildren = newChildren;

    return {
      old: oldChildren,
      new: newChildren,
      removed: removed,
      appended: appended,
      prepended: prepended,
      moved: moved
    };
  }

  performLayout () {
    let diff = this.diffDomChildren();

    if (diff.removed.length > 0) {
      this.masonry.remove(diff.removed);
      this.masonry.reloadItems();
    }

    if (diff.appended.length > 0) {
      this.masonry.appended(diff.appended);
      this.masonry.reloadItems();
    }

    if (diff.prepended.length > 0) {
      this.masonry.prepended(diff.prepended);
    }

    if (diff.moved.length > 0) {
      this.masonry.reloadItems();
    }

    this.masonry.layout();
  }

  imagesLoaded () {
    imagesloaded(
      this.refs[refName],
      instance => {
        this.masonry.layout();
      }
    );
  }

  componentDidMount () {
    this.initializeMasonry();
    this.imagesLoaded();
  }

  componentDidUpdate () {
    this.performLayout();
    this.imagesLoaded();
  }

  componentWillReceiveProps () {
    this._timer = setTimeout(() => {
      this.masonry.reloadItems();
      this.forceUpdate();
    });
  }

  componentWillUnmount () {
    clearTimeout(this._timer);
  }

  render () {
    return React.createElement(this.props.elementType, {
      className: this.props.className,
      ref: refName
    }, this.props.children);
  }

}

MasonryGrid.propTypes = {
  options: React.PropTypes.object
};

MasonryGrid.defaultProps = {
  options: {},
  className: '',
  elementType: 'div'
};
