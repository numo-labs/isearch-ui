import React, { PropTypes, Component } from 'react';
import ReactGridLayout from 'react-grid-layout';
require('./style.css');
class Gallery extends Component {
  render() {
    return (
      <ReactGridLayout cols={12} rowHeight={30}>
        <div className='tile' key="1" _grid={{x: 0, y: 0, w: 1, h: 2}}>1</div>
        <div className='tile' key="2" _grid={{x: 1, y: 0, w: 1, h: 2}}>2</div>
        <div className='tile' key="3" _grid={{x: 2, y: 0, w: 1, h: 2}}>3</div>
      </ReactGridLayout>
    );
  }
};

export default Gallery;
