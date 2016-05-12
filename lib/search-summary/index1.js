import React, { Component, PropTypes } from 'react';
import SearchSummaryHeader from './header';
import EditDetails from './edit-details';
import './style.css';
import '../datepicker/css/index.css';

export default class SearchSummary extends Component {
  constructor () {
    super();
    this.state = {
      visibleTab: 'none'
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  handleScroll (e) {
    if (window.scrollY > window.innerHeight / 4) {
      this.setState({visibleTab: 'header'});
    } else {
      if (this.state.visibleTab === 'header') {
        this.setState({visibleTab: 'none'});
      }
    }
  }
  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }
  render () {
    const {
      numberOfAdultsTitle,
      numberOfChildrenTitle,
      durationTitle,
      duration,
      startSearch
    } = this.props;
    const numberOfChildrenTitleVisible = Number(numberOfChildrenTitle) > 0 ? numberOfChildrenTitle + ' børn' : '';
    const paxMix = numberOfAdultsTitle && numberOfChildrenTitle && durationTitle && numberOfAdultsTitle + ' voksne ' + ', ' + numberOfChildrenTitleVisible;
    if (this.state.visibleTab === 'header') {
      return (
        <div className='searchSummaryContainer'>
          <SearchSummaryHeader
            changeDetails={() => this.setState({visibleTab: 'edit-details'})}
            viewTags={() => {}}
            durationInWeeks={duration}
            paxMix={paxMix}
          />
        </div>
      );
    } else if (this.state.visibleTab === 'edit-details') {
      return (
        <div className='searchSummaryContainer'>
          <EditDetails
            {...this.props}
            exitButtonClick={() => this.setState({visibleTab: 'header'})}
            onSearchClick={() => { this.setState({visibleTab: 'header'}); startSearch(); }}
          />
        </div>
      );
    } else {
      return <div/>;
    }
  }
}

SearchSummary.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  durationInWeeks: PropTypes.number,
  paxMix: PropTypes.string,
  departureDate: PropTypes.string,
  returnDate: PropTypes.string,
  window: PropTypes.object,
  numberOfAdults: PropTypes.string,
  numberOfChildren: PropTypes.string,
  setNumberOfAdultsTitle: PropTypes.func,
  setNumberOfChildrenTitle: PropTypes.func,
  setDurationTitle: PropTypes.func,
  duration: PropTypes.string,
  startSearch: PropTypes.func,
  setNumberOfChildren: PropTypes.func,
  setNumberOfAdults: PropTypes.func,
  childAge1: PropTypes.string,
  childAge2: PropTypes.string,
  childAge3: PropTypes.string,
  childAge4: PropTypes.string,
  setChildAge: PropTypes.func,
  setDepartureAirport: PropTypes.func,
  setDepartureDate: PropTypes.func,
  setDuration: PropTypes.func,
  numberOfAdultsTitle: PropTypes.string,
  numberOfChildrenTitle: PropTypes.string,
  durationTitle: PropTypes.string,
  departureAirport: PropTypes.string
};
