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
    // const itemsPerRow = Math.floor(window.innerWidth / this.props.itemWidth);
    const itemsPerRow = 1;
    const visibleStart = Math.floor(scrollPosition / this.props.itemHeight) * itemsPerRow;
    const visibleEnd = Math.min(visibleStart + this.props.itemsPerPage, this.props.items.length - 1);
    const displayStart = Math.max(0, visibleStart - this.props.itemsPerPage * 1.5);
    const displayEnd = Math.min(displayStart + 4 * this.props.itemsPerPage, this.props.items.length - 1)
    console.log('SCROLLY', scrollPosition, visibleStart + 1, visibleEnd + 1);
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
