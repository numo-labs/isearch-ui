import React, { PropTypes, Component } from 'react';
import Stars from './five-stars.js';
import Description from './description.js';

require('./style.css');

export default class FilterTile extends Component {
  render () {
    const { description, color } = this.props;
    return (
      <div className='container' style={{backgroundColor: color}}>
        <div className='questionMarkContainer'>?</div>
        <div className='contentContainer'>
          <Description description={description} />
          <Stars color={color}/>
        </div>
      </div>
    );
  }
}

FilterTile.propTypes = {
  description: PropTypes.obj,
  color: PropTypes.string
};
