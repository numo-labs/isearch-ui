import React, { Component } from 'react';
import Tags from 'tags';
import SearchSummary from 'search-summary';
import SearchBar from 'search-bar';
import * as mockData from './mockData.js';
import Grid from './grid.js';
import AddMessage from 'add-message';
import Modal from './modal.js';

require('./style.css');
require('./normalise.css');
class Gallery extends Component {
  constructor () {
    super();
    this.state = {
      addMessageVisible: false,
      modalVisible: false
    };
    this.hideAddMessage = this.hideAddMessage.bind(this);
    this.showAddMessage = this.showAddMessage.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  hideAddMessage () {
    this.setState({addMessageVisible: false});
  }

  showAddMessage () {
    setTimeout(() => {
      this.setState({addMessageVisible: true});
    }, 500);
  }

  showModal () {
    this.setState({modalVisible: true});
  }

  closeModal () {
    this.setState({modalVisible: false});
  }

  render () {
    const { searchSummary, ...tileData } = mockData;
    const { addMessageVisible } = this.state;
    return (
      <div className='homeContainer'>
        <Modal showModal={this.state.modalVisible} close={this.closeModal}/>
        <SearchBar />
        <SearchSummary {...searchSummary} />
        <Tags />
        <Grid showAddMessage={this.showAddMessage} tileData={tileData}/>
        {addMessageVisible && <AddMessage hideAddMessage={this.hideAddMessage} suggestedLocations='Croatia and Greece'/>}
        <div className='filterIcon' onClick={this.showModal}>
          <i className='fa fa-filter fa-2x'/>
        </div>
      </div>
    );
  }
}

export default Gallery;
