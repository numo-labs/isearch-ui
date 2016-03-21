import React, { Component, PropTypes } from 'react';
import Tags from '../../containers/tags';
import SearchSummary from 'search-summary';
import SearchBar from 'search-bar';
import { searchSummary, tiles } from './mockData.js';
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
    this.props.fetchQuerySearchResults('12345', 1, 20);
  }

  handleOnButtonClick () {
    this.props.startSearch();
    this.props.fetchQuerySearchResults('12345', 1, 20);
  }
  shuffleMockedTilesIntoResultSet (items) {
    if (items.length) {
      return this.addTilesToSearchResult(items, 2, Math.floor((items.length + 6) / 6), 0);
    } else {
      return items;
    }
  }

  addTilesToSearchResult (items, position, index, count) {
    items.splice(position, 0, tiles[count]);
    if (count === 5) {
      return items;
    } else {
      return this.addTilesToSearchResult(items, position + index, index, ++count);
    }
  }

  render () {
    const { addMessageVisible, hideAddMessage, loading, items } = this.props;
    const shuffledTiles = this.shuffleMockedTilesIntoResultSet(items);
    return (
      <div className='homeContainer'>
        <Modal modalVisible={this.state.modalVisible} close={this.closeModal}/>
        <SearchBar onButtonClick={this.handleOnButtonClick.bind(this)} />
        <SearchSummary {...searchSummary} />
        <Tags />
        {loading ? <LoadingSpinner /> : <Grid items={shuffledTiles} />}
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
  fetchQuerySearchResults: PropTypes.func,
  items: PropTypes.array,
  startSearch: PropTypes.func
};

export default Home;
