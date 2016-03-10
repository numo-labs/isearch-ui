import React, { PropTypes, Component } from 'react';
import Stars from './five-stars.js';
import Description from './description.js';
import InfoText from './info-bubble.js';

require('./style.css');

export default class FilterTile extends Component {
  constructor () {
    super();
    this.state = {
      stars: Array(5).fill(false),
      infoBoxVisible: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggleInfoBox = this.toggleInfoBox.bind(this);
  }

  handleClick (index) {
    const starSelected = this.state.stars[index];
    let newStarState;
    if (index === 0 && this.state.stars[index + 1]) {
      // first star selected and second star selected --> deselect second star but keep first star selected
      newStarState = [true, ...Array(4 - index).fill(false)];
    } else if (index === 0 && starSelected) {
      // first star selected --> deselect first star
      newStarState = [!starSelected, ...Array(3 - index).fill(false)];
    } else if (starSelected) {
      newStarState = [...Array(index + 1).fill(true), false, ...Array(3 - index).fill(false)];
    } else {
      newStarState = [...Array(index + 1).fill(true), ...Array(4 - index).fill(false)];
    }
    this.setState({ stars: newStarState });
    this.props.showAddMessage();
  }

  toggleInfoBox () {
    this.setState({infoBoxVisible: !this.state.infoBoxVisible});
  }

  render () {
    const { description, color } = this.props;
    const { infoBoxVisible } = this.state;
    return (
      <div className='container' style={{backgroundColor: color}}>
        <div className='questionMarkContainer' onClick={this.toggleInfoBox}>?</div>
        { infoBoxVisible && <InfoText /> }
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
  color: PropTypes.string,
  showAddMessage: PropTypes.func
};
