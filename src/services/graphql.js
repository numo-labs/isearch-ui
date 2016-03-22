'use strict';

import fetch from 'isomorphic-fetch';

/**
* Express-graphql accepts request with the parameters
* @{query} - A valid GraphQL query or mutation
* @{variables} - runtime values to use for any GraphQL query variables as a JSON object
* Need to specify the content-type as 'application/json' in the request header.
**/

export function query (query, variables) {
  return fetch('https://f0uih51vu0.execute-api.eu-west-1.amazonaws.com/ci/graphql', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'query': query, 'variables': JSON.stringify(variables) })
  })
  .then(res => res.json());
}
