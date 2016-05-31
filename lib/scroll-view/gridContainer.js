import React, { PropTypes, Component } from 'react';
import InfiniteScrollGrid from './grid.js';
export default class InfiniteScrollGridContainer extends Component {

  constructor (props) {
    super();
    this.state = {
      visibleStart: 0,
      visibleEnd: props.itemsPerPage,
      displayStart: 0,
      displayEnd: props.itemsPerPage * 2,
      scrollPosition: 0
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentWillMount () {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnMount () {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll () {
    const node = this._scrollable.getDOMNode();
    const scrollPosition = window.pageYOffset;
    console.log('node', node.scrollTop);
    // const itemsPerRow = Math.floor(window.innerWidth / this.props.itemWidth);
    const itemsPerRow = 1;
    const visibleStart = Math.floor(scrollPosition / (0.5 * this.props.itemHeight)) * itemsPerRow;
    const visibleEnd = visibleStart + this.props.itemsPerPage;
    const displayStart = Math.max(0, visibleStart - this.props.itemsPerPage * 1);
    const displayEnd = displayStart + 2 * this.props.itemsPerPage;
    console.log('SCROLLY', scrollPosition, 'display start', displayStart, 'display end', displayEnd, 'visible start', visibleStart, 'visible end', visibleEnd);
    this.setState({
      visibleStart,
      visibleEnd,
      displayStart,
      displayEnd
    });
  }

  render () {
    return (
      <div ref={(c) => this._scrollable = c}>
        <InfiniteScrollGrid
          total={this.props.items.length}
          visibleStart={this.state.visibleStart}
          visibleEnd={this.state.visibleEnd}
          displayStart={this.state.displayStart}
          displayEnd={this.state.displayEnd}
          itemHeight={this.props.itemHeight}
          itemWidth={this.props.itemWidth}
        >
          {this.props.items}
        </InfiniteScrollGrid>
      </div>
    );
  }
}
