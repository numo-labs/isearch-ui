import React, { PropTypes, Component } from 'react';

require('./style.css');

// star svg from here https://www.w3.org/TR/SVG/shapes.html

export default class Star extends Component {

  constructor() {
    super();
    this.state = { checked: false }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ checked: !this.state.checked })
  }

  render () {
    const { height, width } = this.props;
    const { checked } = this.state;

    const wscale = width/400;
    const hscale = height/400;

    const pointArray =  [
      (350-180)*wscale + ',' +  75*hscale,
      (379-180)*wscale + ',' +  161*hscale,
      (469-180)*wscale + ',' +  161*hscale,
      (397-180)*wscale + ',' +  215*hscale,
      (423-180)*wscale + ',' +  301*hscale,
      (350-180)*wscale + ',' +  250*hscale,
      (277-180)*wscale + ',' +  301*hscale,
      (303-180)*wscale + ',' +  215*hscale,
      (231-180)*wscale + ',' +  161*hscale,
      (321-180)*wscale + ',' +  161*hscale,
    ];

    const points = pointArray.join(' ');

    return (
    <div onClick={this.handleClick} className="star">
      <svg style={{height: height, width: width}}>
        <polygon points={points} style={{fill: checked ? '#ffffff' : '#B9CAA8', strokeWidth: '2', stroke:'white', fillRule: 'nonzero', float: 'left'}}/>
      </svg>
    </div>
    );
  }
}

Star.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};
