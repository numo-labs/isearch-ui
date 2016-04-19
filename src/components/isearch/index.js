import React, { PropTypes, Component } from 'react';
import Header from '../../../lib/header/';
import SearchSummary from '../../../lib/search-summary/';
import Tags from '../../../lib/tags/';
import SearchResults from '../search-results';
import LoadingSpinner from '../../../lib/spinner';
import HotelPage from '../../../lib/hotel-page';
const mockPackageOffer = {
  'description': 'Lorem ipsum dolor sit amet, magna est placerat velit auctor aenean sodales. Interdum metus, mollis lorem tempor vel amet quisque hymenaeos, luctus in vehicula tristique sed molestie, sodales gravida vivamus placerat. Aliquam aliquet tempus, suspendisse dolor aenean rhoncus cras a, in turpis curabitur semper mi in mattis, justo augue nisl sit magna urna, nonummy proin id. Ac vel nisl pellentesque non, non arcu justo, dictum tempor aenean lacus ipsum. Nullam ut montes vitae suspendisse sociis vitae. Quam a ante tristique etiam tellus, morbi vitae eget eget in. Tortor mi nulla hac, faucibus cras in nascetur amet maecenas, per nulla vitae in et.',
  'hotel': {
    'id': 'hotel:mhid.ygky5mL',
    'name': 'Viva Sunrise',
    'images': [
      {
        'type': 'image/jpeg',
        'displaySequence': null,
        'primary': null,
        'uri': '/H0/00/36/37/TCUK_STEP51_v1_668866.jpg'
      },
      {
        'type': 'image/jpeg',
        'displaySequence': null,
        'primary': null,
        'uri': '/H0/00/36/37/TCUK_STEP51_v1_668888.jpg'
      },
      {
        'type': 'image/jpeg',
        'displaySequence': null,
        'primary': null,
        'uri': '/H0/00/36/37/TCUK_STEP51_v1_773200.jpg'
      },
      {
        'type': 'image/jpeg',
        'displaySequence': null,
        'primary': null,
        'uri': '/H0/00/36/37/TCUK_STEP51_v1_227930.jpg'
      },
      {
        'type': 'image/jpeg',
        'displaySequence': null,
        'primary': null,
        'uri': '/H0/00/36/37/TCUK_STEP51_v1_668879.jpg'
      },
      {
        'type': 'image/jpeg',
        'displaySequence': null,
        'primary': null,
        'uri': '/H0/00/36/37/TCUK_STEP51_v1_668900.jpg'
      },
      {
        'type': 'image/jpeg',
        'displaySequence': null,
        'primary': null,
        'uri': '/H0/00/36/37/TCUK_STEP51_v1_773205.jpg'
      },
      {
        'type': 'image/jpeg',
        'displaySequence': null,
        'primary': null,
        'uri': '/H0/00/36/37/TCUK_STEP51_v1_773201.jpg'
      },
      {
        'type': 'image/jpeg',
        'displaySequence': null,
        'primary': null,
        'uri': '/H0/00/36/37/TCUK_STEP51_v1_668904.jpg'
      },
      {
        'type': 'image/jpeg',
        'displaySequence': null,
        'primary': null,
        'uri': '/H0/00/36/37/TCUK_STEP51_v1_773206.jpg'
      },
      {
        'type': 'image/jpeg',
        'displaySequence': null,
        'primary': null,
        'uri': '/H0/00/36/37/TCUK_STEP51_v1_668902.jpg'
      },
      {
        'type': 'image/jpeg',
        'displaySequence': null,
        'primary': null,
        'uri': '/H0/00/36/37/TCUK_STEP51_v1_546203.jpg'
      }
    ],
    'starRating': '3',
    'place': {
      'name': 'Port d\'Alcúdia',
      'country': 'Spain',
      'region': 'Balearic Islands'
    }
  },
  'flights': {
    'outbound': [{
      'number': 'TCX1124',
      'departure': {
        'localDateTime': '2016-06-13T06:10',
        'airport': {
          'code': 'LGW',
          'name': 'Gatwick'
        }
      },
      'arrival': {
        'localDateTime': '2016-06-13T09:30',
        'airport': {
          'code': 'PMI'
        }
      },
      'carrier': {
        'code': 'TCX'
      }
    }],
    'inbound': [{
      'number': 'TCX1125',
      'departure': {
        'localDateTime': '2016-06-20T10:30',
        'airport': {
          'code': 'PMI',
          'name': 'Son Sant Joan'
        }
      },
      'arrival': {
        'localDateTime': '2016-06-20T11:55',
        'airport': {
          'code': 'LGW'
        }
      },
      'carrier': {
        'code': 'TCX'
      }
    }]
  },
  'price': {
    'total': '3076',
    'perPerson': '1537.98',
    'currency': 'GBP'
  },
  'provider': {
    'id': 'ac-searcher',
    'reference': 'A01A37'
  },
  'nights': 7,
  'amenities': {
    'outdoorpool': '3 stk.',
    'distancetobeach': '0 m',
    'distancetocenter': '500 m',
    'bar': true,
    'childrenpool': true,
    'elevator': true,
    'poolbar': true,
    'restaurant': true,
    'minimarket': true,
    'cleaningdaysperweek': '5',
    'wifi': true,
    'waterslide': true,
    'lolloandbernie': false,
    'isadulthotel': false,
    'allinclusive': false
  }
};
class ISearch extends Component {

  constructor () {
    super();
    this.fetchQueryResults = this.fetchQueryResults.bind(this);
  }

  componentWillMount () {
    this.fetchQueryResults();
  }

  /**
   * For testing and building purposes we pass through a list of fixed tags.
   * TODO: Replace this with the proper solution!
   */

   fetchQueryResults () {
     this.props.fetchQuerySearchResults(12345, 1, 20, 1);
   }

  renderResults () {
    const {
      displayedItems,
      onYesFilter,
      onFilterClick,
      showAddMessage,
      filterVisibleState,
      loading,
      error
    } = this.props;

    if (loading) {
      return <LoadingSpinner />;
    } else if (error) {
      return <div className='errorMessage'>{error}</div>;
    } else {
      return (
        <SearchResults
          items={displayedItems}
          onYesFilter={onYesFilter}
          onFilterClick={onFilterClick}
          filterVisibleState={filterVisibleState}
          showAddMessage={showAddMessage}
          error={error}
        />
      );
    }
  }

  render () {
    const {
      tags,
      removeTag,
      setSearchString,
      startSearch,
      addSearchStringTag
    } = this.props;
    return (
      <section>
        <HotelPage packageOffer={mockPackageOffer} />
        <SearchSummary
          city='Bodrum'
          country='Turkey'
          durationInWeeks={1}
          paxMix='2 adults, 2 children'
          departureDate='Sun 13 jul 2016'
          returnDate='Tue 15 jul 2016'
        />
        <Header />
        <Tags
          tags={tags}
          removeTag={removeTag}
          onSearchButtonClick={() => { addSearchStringTag(); startSearch(); }}
          setSearchString={setSearchString}
        />
        { this.renderResults() }
      </section>
    );
  }
}

ISearch.propTypes = {
  tags: PropTypes.array,
  displayedItems: PropTypes.array,
  onYesFilter: PropTypes.func,
  onFilterClick: PropTypes.func,
  showAddMessage: PropTypes.func,
  hideAddMessage: PropTypes.func,
  filterVisibleState: PropTypes.object,
  fetchQuerySearchResults: PropTypes.func,
  removeTag: PropTypes.func,
  setSearchString: PropTypes.func,
  searchString: PropTypes.string,
  startSearch: PropTypes.func,
  addSearchStringTag: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default ISearch;
