import React, { Component, PropTypes } from 'react';
require('./style.css');

const styles = {
  active: {
    display: 'inherit'
  },
  inactive: {
    display: 'none'
  }
};

export default class SearchSummary extends Component {
  constructor () {
    super();
    this.state = {
      active: true
    };
  }
  toggle () {
    this.setState({
      active: !this.state.active
    });
  }
  render () {
    const stateStyle = this.state.active ? 'changeInputActive' : 'changeInputInactive';
    return (
        <div className='searchSummaryContainer'>
          <div className='blueContainer'>
            <div className='weeksPaxMix'>
              <div className='weeks'>{this.props.durationInWeeks} week</div>
              <br/>
              <div className='paxMix'>{this.props.paxMix}</div>
            </div>
            <div className='changeButton' onClick={this.toggle.bind(this)}>CHANGE</div>
            <div className='dropDown'>
              <div className={stateStyle}>
                <input placeholder='departing from' className='input departFrom'/>
                <row>
                  <input placeholder='departure date' className='input departDate'/>
                  <input placeholder='weeks' className='input vacationLength'/>
                </row>
                <input placeholder='passengers e.g. 2 adults 2 children' className='input departFrom'/>
                <div className='changeInputButton'>Search</div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

SearchSummary.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  durationInWeeks: PropTypes.number,
  paxMix: PropTypes.string,
  departureDate: PropTypes.string,
  returnDate: PropTypes.string
};
