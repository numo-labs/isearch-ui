export const QUERY_FETCH_SEARCH_RESULT = `
query searchResultQuery($id: String, $page: Int, $size: Int) {
  viewer {
    searchResult(id: $id) {
      metadata {
        id,
        bucketCount,
        isSealed,
        searchTerms {
          type,
          label
        }
      }
      items(page: $page, size: $size) {
        ...on packageOfferItem {
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
            nights,
            amenities {
            	outdoorpool,
              distancetobeach,
              distancetocenter,
              bar,
              childrenpool,
              elevator,
              poolbar,
              restaurant,
              minimarket,
              cleaningdaysperweek,
              wifi,
              waterslide,
              lolloandbernie,
              isadulthotel,
              allinclusive,
            }
          }
        },
        ...on tileItem {
          id,
          type,
          ranking,
          tile {
            title,
            doc
          }
        }
      }
    }
  }
}
`;
