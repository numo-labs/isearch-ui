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
    const starSelected = this.state.stars[index];
    let newStarState;
    if (index === 0 && this.state.stars[index + 1]) {
      newStarState = [true, ...Array(4 - index).fill(false)];
    } else if (index === 0 && starSelected) {
      newStarState = [!starSelected, ...Array(3 - index).fill(false)];
    } else if (starSelected) {
      newStarState = [...Array(index + 1).fill(true), false, ...Array(3 - index).fill(false)];
    } else {
      newStarState = [...Array(index + 1).fill(true), ...Array(4 - index).fill(false)];
    }
    this.setState({ stars: newStarState });
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
