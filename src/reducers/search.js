'use strict';

import {
  RECEIVE_SEARCH_RESULT,
  BUSY_SEARCHING,
  TAG_ADD_TAGS,
  TAG_REMOVE_TAG,
  TAG_ADD_SINGLE_TAG,
  FILTER_ON_CLICK,
  TILES_ADD_TILES,
  SHOW_ADD_MESSAGE,
  HIDE_ADD_MESSAGE
 } from '../constants/actionTypes';

import { mockTiles, mockTags } from './utils/mockData.js';
import { shuffleMockedTilesIntoResultSet } from './utils/helpers.js';

const initialState = {
  items: [],
  bucketCount: 0,
  status: undefined,
  id: undefined,
  loading: true,
  tags: [],
  filterVisibleState: {},
  tiles: [],
  addMessageVisible: false
};

export default function search (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SEARCH_RESULT:
      const items = shuffleMockedTilesIntoResultSet(action.items, state.tiles.concat(state.tags));
      return {...state, items: items, loading: action.loading};
    case BUSY_SEARCHING:
      return {...state, loading: action.loading};
    case TAG_ADD_TAGS:
      const tags = action.tags === undefined ? mockTags : action.tags;
      return {
        ...state,
        tags: tags
      };
    case TAG_ADD_SINGLE_TAG:
      return {
        ...state,
        tags: [...state.tags, action.tag]
      };
    case TAG_REMOVE_TAG:
      const newTags = state.tags.filter(tag => {
        return tag.tagName !== action.tagName;
      });
      return {
        ...state,
        tags: newTags
      };
    case FILTER_ON_CLICK:
      return {
        ...state,
        filterVisibleState: {
          ...state.filterVisibleState,
          [action.tagName]: false
        }
      };
    case TILES_ADD_TILES:
      const tileArray = action.tileArray === undefined ? mockTiles : action.tileArray;
      const filterVisibleState = tileArray.reduce((obj, tile) => {
        if (tile.type === 'filter') {
          obj[tile.bigWord] = true;
        }
        return obj;
      }, {});
      return {
        ...state,
        filterVisibleState,
        tiles: tileArray
      };
    case SHOW_ADD_MESSAGE:
      return ({
        ...state,
        addMessageVisible: true
      });
    case HIDE_ADD_MESSAGE:
      return ({
        ...state,
        addMessageVisible: false
      });
    default:
      return state;
  }
}

/* the items array consists of package offer items and tile items

package offer item object will have the following shape:

         {
          id,
          type,
          ranking,
          packageOffer {
            hotel {
              id,
              name,
              images {
                type,
                displaySequence,
                uri,
                primary
              }
              starRating,
              place {
                name,
                country,
                region
              }
            },
            flights {
              outbound {
                number,
                departure {
                  localDateTime,
                  airport {
                    code,
                    name,
                    city
                  }
                }
                arrival {
                  localDateTime,
                  airport {
                    code,
                    name,
                    city
                  }
                }
                carrier {
                  code
                }
              },
              inbound {
                number,
                departure {
                  localDateTime,
                  airport {
                    code,
                    name,
                    city
                  }
                }
                arrival {
                  localDateTime,
                  airport {
                    code,
                    name,
                    city
                  }
                }
                carrier {
                  code
                }
              }
            },
            price {
              total,
              perPerson,
              currency
            },
            provider {
              id,
              reference,
              context,
              deepLink
            },
            nights
          }
        }

tile item object will take the following form:
         {
          id,
          type,
          ranking,
          tile {
            title,
            doc
          }
        }
*/
