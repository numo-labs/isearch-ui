import React, { PropTypes, Component } from 'react';
import Masonry from 'react-masonry-component';

const masonryOptions = {
  transitionDuration: '0.4s',
  // itemSelector: '.gridItem',
  fitWidth: true,
  gutter: 14 // horizontal spacing between tiles
};

export default class InfiniteScrollGrid extends Component {

  constructor () {
    super();
    this.state = {
      shouldUpdate: true,
      displayStart: 0,
      total: 0,
      displayEnd: 0
    };
  }

  componentWillReceiveProps (nextProps) {
    var shouldUpdate = !(
      nextProps.visibleStart >= this.state.displayStart &&
      nextProps.visibleEnd <= this.state.displayEnd
    ) || (nextProps.total !== this.state.total); // visible range is outside of the displayed range or total has increased

    if (shouldUpdate) {
      this.setState({
        shouldUpdate: shouldUpdate,
        displayStart: nextProps.displayStart,
        total: nextProps.total,
        displayEnd: nextProps.displayEnd
      });
    } else {
      this.setState({shouldUpdate: false});
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.state.shouldUpdate;
  }

  render () {
    const itemsPerRow = Math.floor(window.innerWidth / this.props.itemWidth);
    console.log('itemsPerRow', itemsPerRow);
    const visibleItems = this.props.children.slice(this.props.displayStart, this.props.displayEnd);
    console.log('visibleItems', this.props.displayStart, this.props.displayEnd, this.props.visibleStart, this.props.visibleEnd);
    return (
      <Masonry
        elementType={'div'}
        options={masonryOptions}
        disableImagesLoaded={false}
        className='grid load-effect'
      >
        <TopPad displayStart={this.state.displayStart} itemsPerRow={itemsPerRow} itemHeight={this.props.itemHeight}/>
        {visibleItems}
        <BottomPad displayEnd={this.state.displayEnd} total={this.state.total} itemsPerRow={itemsPerRow} itemHeight={this.props.itemHeight}/>
      </Masonry>
    );
  }
}

class TopPad extends Component {
  render () {
    const height = Math.floor((this.props.displayStart / this.props.itemsPerRow) * this.props.itemHeight);
    return (
      <div className = 'grid-top-padding' style={{height: height}}/>
    );
  }
}

class BottomPad extends Component {
  render () {
    const height = Math.floor((this.props.total - this.props.displayEnd) / this.props.itemsPerRow * this.props.itemHeight);
    return (
      <div className = 'grid-bottom-padding' style={{height: height}}/>
    );
  }
}
