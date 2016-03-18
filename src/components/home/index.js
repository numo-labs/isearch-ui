import React, { Component, PropTypes } from 'react';
import Tags from '../../containers/tags';
import SearchSummary from 'search-summary';
import SearchBar from 'search-bar';
import * as mockData from './mockData.js';
import Grid from '../../containers/grid';
import AddMessage from 'add-message';
import Modal from '../modal';
import LoadingSpinner from 'spinner';

require('./style.css');
class Home extends Component {
  constructor () {
    super();
    this.state = {
      modalVisible: false
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  showModal () {
    this.setState({modalVisible: true});
  }

  closeModal () {
    this.setState({modalVisible: false});
  }

  componentDidMount () {
    this.props.fetchQuerySearchResults();
  }

  render () {
    const { searchSummary, ...tileData } = mockData;
    const { addMessageVisible, hideAddMessage, loading } = this.props;
    return (
      <div className='homeContainer'>
        <Modal modalVisible={this.state.modalVisible} close={this.closeModal}/>
        <SearchBar />
        <SearchSummary {...searchSummary} />
        <Tags />
        {loading ? <LoadingSpinner /> : <Grid tileData={tileData}/>}
        {addMessageVisible && <AddMessage hideAddMessage={hideAddMessage} suggestedLocations='Croatia and Greece'/>}
        <div className='filterIcon' onClick={this.showModal}>
          <img src='https://cloud.githubusercontent.com/assets/12450298/13809901/f6118360-eb64-11e5-95b5-da4a401dc5e6.png'
          className='fa fa-filter fa-2x'/>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  addMessageVisible: PropTypes.bool,
  hideAddMessage: PropTypes.func,
  loading: PropTypes.bool,
  fetchQuerySearchResults: PropTypes.func
};

export default Home;
