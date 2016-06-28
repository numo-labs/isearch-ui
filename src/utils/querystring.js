import querystring from 'querystring';

export default {
  parse: () => querystring.parse(window.location.search.replace(/^\?/, ''))
};
