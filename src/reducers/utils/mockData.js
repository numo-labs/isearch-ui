export const mockTags = [];

const instagramPrefix = 'https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xpf1/t51.12885-15/';

export const mockTiles = [
  {
    type: 'article',
    backgroundImage: `${instagramPrefix}s750x750/sh0=108/e35/12479379_141330706245237_420500081_n.jpg`,
    label: 'Sun and Bathe',
    title: '10 TURKISH GEMS',
    overview: 'CLOSE TO BEACH AND CITY'
  },
  {
    backgroundImage: `${instagramPrefix}e35/10472010_1689478414643553_296617682_n.jpg`,
    label: 'Explore',
    title: 'TURKEY',
    overview: '5 HIDDEN SECRETS OF',
    type: 'article'
  },
  {
    prefix: 'Are you travelling with',
    displayName: 'Kids',
    type: 'filter',
    color: '#DC3767',
    id: 'amenity:childrenpool',
    filterString: 'childrenpool'
  },
  {
    prefix: 'Are you looking for',
    displayName: 'All inclusive',
    type: 'filter',
    color: '#F39110',
    id: 'amenity:allinclusive',
    filterString: 'allinclusive'
  },
  {
    prefix: 'Do you need access to',
    displayName: 'Wifi',
    type: 'filter',
    color: '#8EB8C4',
    id: 'amenity:wifi',
    filterString: 'wifi'
  }
];
