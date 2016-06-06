import React, { Component, PropTypes } from 'react';
import SearchSummaryHeader from './header';
import './style.css';
import '../react-date-picker/css/index.css';

export default class SearchSummary extends Component {
  constructor () {
    super();
    this.state = {
      visible: false
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  handleScroll (e) {
    if (window.scrollY > window.innerHeight / 4) {
      this.setState({visible: true});
    } else {
      this.setState({visible: false});
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
        changeRoute
      },
      state: {
        visible
      }
    } = this;
    const numberOfChildrenTitleVisible = Number(numberOfChildrenTitle) > 0 ? ', ' + numberOfChildrenTitle + ' børn' : '';
    const paxMix = numberOfAdultsTitle && numberOfChildrenTitle && durationTitle ? numberOfAdultsTitle + ' voksne ' + numberOfChildrenTitleVisible : '';
    if (visible) {
      return (
        <div className='searchSummaryContainer'>
          <SearchSummaryHeader
            durationInWeeks={duration}
            paxMix={paxMix}
            changeRoute={changeRoute}
          />
        </div>
      );
    } else {
      return <div/>;
    }
  }
}

SearchSummary.propTypes = {
  numberOfChildrenTitle: PropTypes.string,
  numberOfAdultsTitle: PropTypes.string,
  durationInWeeks: PropTypes.number,
  paxMix: PropTypes.string,
  window: PropTypes.object,
  durationTitle: PropTypes.string,
  duration: PropTypes.string,
  changeRoute: PropTypes.func,
  goBack: PropTypes.func
};
