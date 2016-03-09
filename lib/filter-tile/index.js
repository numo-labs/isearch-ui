import React, { PropTypes, Component } from 'react';
import Stars from './five-stars.js';
import Description from './description.js';

require('./style.css');

export default class FilterTile extends Component {
  constructor () {
    super();
    this.state = {
      stars: Array(5).fill(false)
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (index) {
    let starsState = this.state.stars;
    const starSelected = this.state.stars[index];
    if (index === 0 && this.state.stars[index + 1]) {
      starsState = [true, ...Array(4 - index).fill(false)]
    } else if (index === 0 && starSelected) {
      starsState = [!starSelected, ...Array(3 - index).fill(false)];
    } else if (starSelected) {
      starsState = [...Array(index + 1).fill(true), false, ...Array(3 - index).fill(false)];
    } else {
      starsState = [...Array(index + 1).fill(true), ...Array(4 - index).fill(false)];
    }
    this.setState({ stars: starsState });
  }

  render () {
    const { description, color } = this.props;
    return (
      <div className='container' style={{backgroundColor: color}}>
        <div className='questionMarkContainer'>?</div>
        <div className='contentContainer'>
          <Description description={description} />
          <Stars color={color} handleClick={this.handleClick} filledState={this.state.stars}/>
        </div>
      </div>
    );
  }
}

FilterTile.propTypes = {
  description: PropTypes.obj,
  color: PropTypes.string
};
