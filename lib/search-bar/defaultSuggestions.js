/**
 * If there is no suggestions matches this list will be displayed
 */
export const noSuggestions = [{
  title: 'Din søgning gav ingen resultater…',
  subTitle: 'Prøv evt. et af disse søgeord i stedet',
  suggestions: [
    {
      active: true,
      boost: null,
      label: 'Spanien',
      name: 'Spanien',
      tagid: 'geo:geonames.2510769'
    },
    {
      active: true,
      boost: null,
      label: 'All inclusive',
      name: 'All inclusive',
      tagid: 'amenity:ne.allinclusive'
    },
    {
      active: true,
      boost: null,
      label: 'Lollo & Bernie',
      name: 'Lollo',
      tagid: 'tile:article.dk.19'
    },
    {
      active: true,
      boost: null,
      label: 'Internet',
      name: 'Internet',
      tagid: 'amenity:ne.wifi'
    }
  ]
}];

export const defaultSuggestions = [
  {
    subTitle: 'Populære søgeord',
    suggestions: [
      {
        active: true,
        boost: null,
        label: 'Storbyferie',
        name: 'Storbyferie',
        tagid: 'marketing:term.citytrip'
      },
      {
        active: true,
        boost: null,
        label: 'London',
        name: 'London',
        tagid: 'geo:geonames.2648110'
      },
      {
        active: true,
        boost: null,
        label: 'Barcelona',
        name: 'Barcelona',
        tagid: 'geo:geonames.3128760'
      },
      {
        active: true,
        boost: null,
        label: 'Seværdigheder',
        name: 'Seværdigheder',
        tagid: 'marketing:term.sights'
      },
      {
        active: true,
        boost: null,
        label: 'Rom',
        name: 'Rom',
        tagid: 'geo:geonames.3169070'
      },
      {
        active: true,
        boost: null,
        label: 'Shopping',
        name: 'Shopping',
        tagid: 'marketing:term.shopping'
      }
    ]
  }
];
