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
  }
];
