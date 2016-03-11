import React, { Component, PropTypes } from 'react';
import Tags from '../../containers/tags';
import SearchSummary from 'search-summary';
import SearchBar from 'search-bar';
import * as mockData from './mockData.js';
import Grid from '../grid';
import AddMessage from 'add-message';
import Modal from '../modal';

require('./style.css');
class Gallery extends Component {
  constructor () {
    super();
    this.state = {
      addMessageVisible: false,
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

  render () {
    const { searchSummary, ...tileData } = mockData;
    const { addMessageVisible, showAddMessage, hideAddMessage, yesFilter, noFilter, filterVisible } = this.props;
    return (
      <div className='homeContainer'>
        <Modal showModal={this.state.modalVisible} close={this.closeModal}/>
        <SearchBar />
        <SearchSummary {...searchSummary} />
        <Tags />
        <Grid yesFilter={yesFilter} noFilter={noFilter} filterVisible={filterVisible} showAddMessage={showAddMessage} tileData={tileData}/>
        {addMessageVisible && <AddMessage hideAddMessage={hideAddMessage} suggestedLocations='Croatia and Greece'/>}
        <div className='filterIcon' onClick={this.showModal}>
          <i className='fa fa-filter fa-2x'/>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  addMessageVisible: PropTypes.boolean,
  showAddMessage: PropTypes.func,
  hideAddMessage: PropTypes.func,
  yesFilter: PropTypes.func,
  noFilter: PropTypes.func,
  filterVisible: PropTypes.boolean
};

export default Gallery;
