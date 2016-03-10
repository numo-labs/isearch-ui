import React, { Component, PropTypes } from 'react';

require('./style.css');

export default class AddMessage extends Component {
  render () {
    return (
      <div onClick={this.props.hideAddMessage} className='addMessageContainer'>
        <div className='message'>Great! {this.props.suggestedLocations} might be a match<br/>
        for you! They have been added below.</div>
        <div className='arrowContainer'>
          <img className='arrow' src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-down-512.png'/>
        </div>
      </div>
    );
  }
}

AddMessage.propTypes = {
  suggestedLocations: PropTypes.string,
  hideAddMessage: PropTypes.func
};
