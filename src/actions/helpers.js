'use strict';
/*
* Function to format the query and add keys to the query object based on the tags
*
* Returned object should look like:
*  {
*    passengers: [],
*    geography: [] // key only added if there are geo tags
*  }
*/
export function formatQuery (tags) {
  return tags.reduce((q, tag) => {
    const type = tag.id.split(':')[0];
    const field = type === 'geo' ? 'geography' : type;
    const value = q[field] || {};
    const updatedQuery = {
      ...q,
      [field]: [
        ...value,
        tag.id
      ]
    };
    return updatedQuery;
  }, {});
}
