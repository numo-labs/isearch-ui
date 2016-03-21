'use strict';
import { RECEIVE_SEARCH_RESULT, START_SEARCH } from '../constants/actionTypes';

const initialState = {
  items: [],
  bucketCount: 0,
  status: undefined,
  id: undefined,
  loading: true
};

export default function search (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SEARCH_RESULT:
      return {...state, items: action.items, loading: action.loading};
    case START_SEARCH:
      return {...state, loading: action.loading};
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
