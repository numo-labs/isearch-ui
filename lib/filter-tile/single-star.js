import React, { PropTypes, Component } from 'react';

require('./style.css');

// star svg from here https://www.w3.org/TR/SVG/shapes.html

export default class Star extends Component {

  render () {
    const { height, width, color, onClick, filled } = this.props;

    // scale factors for the star svg

    const wscale = width / 400;
    const hscale = height / 400;

    const pointArray = [
      [170, 75],
      [199, 161],
      [289, 161],
      [217, 215],
      [243, 301],
      [170, 250],
      [97, 301],
      [123, 215],
      [51, 161],
      [141, 161]
    ];

    // create a string of coordinates which mark the vertices of the polygon "100,10 200,20"
    const points = pointArray.map(point => point[0] * wscale + ',' + point[1] * hscale).join(' ');

    return (
      <div onClick={onClick} className='star'>
        <svg style={{height: height, width: width}}>
          <polygon
            points={points}
            style={{
              fill: filled ? '#ffffff' : color,
              strokeWidth: '2',
              stroke: 'white',
              fillRule: 'nonzero',
              float: 'left'
            }}
          />
        </svg>
      </div>
    );
  }
}

Star.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func,
  filled: PropTypes.bool
};
