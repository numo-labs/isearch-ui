import { introspectionQuery } from './introspectionQuery.js';
import request from 'request';
const graphqlApiURL = 'https://f0uih51vu0.execute-api.eu-west-1.amazonaws.com/ci/graphql';
request({
  method: 'post',
  url: graphqlApiURL,
  body: {
    query: introspectionQuery,
    variables: {}
  },
  json: true
}, function (err, res, body) {
  if (err) return console.error(err);
  if (body && body.errors) {
    process.stderr.write(JSON.stringify(body.errors, null, 2));
    process.exit(1);
  } else if (body) {
    process.stdout.write(JSON.stringify(body, null, 2));
  }
});
