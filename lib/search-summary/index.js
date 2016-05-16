import React, { Component, PropTypes } from 'react';
import SearchSummaryHeader from './header';
import EditDetails from './edit-details';
import TagView from './tag-view';
import './style.css';
import '../react-date-picker/css/index.css';

export default class SearchSummary extends Component {
  constructor () {
    super();
    this.state = {
      visibleTab: ''
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.closeTab = this.closeTab.bind(this);
  }
  handleScroll (e) {
    if (window.scrollY > window.innerHeight / 4) {
      this.setState({visibleTab: 'header'});
    } else {
      if (this.state.visibleTab === 'header') {
        this.setState({visibleTab: ''});
      }
    }
  }
  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }
  closeTab () {
    this.setState({visibleTab: 'header'});
  }
  render () {
    const {
      props: {
        numberOfAdultsTitle,
        numberOfChildrenTitle,
        durationTitle,
        duration,
        startSearch
      },
      state: {
        visibleTab
      }
    } = this;
    const numberOfChildrenTitleVisible = Number(numberOfChildrenTitle) > 0 ? ', ' + numberOfChildrenTitle + ' børn' : '';
    const paxMix = numberOfAdultsTitle && numberOfChildrenTitle && durationTitle && numberOfAdultsTitle + ' voksne ' + numberOfChildrenTitleVisible;
    if (visibleTab === 'header') {
      return (
        <div className='searchSummaryContainer'>
          <SearchSummaryHeader
            changeDetails={() => this.setState({visibleTab: 'edit-details'})}
            viewTags={() => this.setState({visibleTab: 'tags'})}
            durationInWeeks={duration}
            paxMix={paxMix}
          />
        </div>
      );
    } else if (visibleTab === 'edit-details') {
      return (
        <div className='searchSummaryContainer'>
          <EditDetails
            {...this.props}
            exitButtonClick={this.closeTab}
            onSearchClick={() => { this.setState({visibleTab: 'header'}); startSearch(); }}
          />
        </div>
      );
    } else if (visibleTab === 'tags') {
      return (
        <div className='searchSummaryContainer'>
          <TagView exitButtonClick={this.closeTab}/>
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
