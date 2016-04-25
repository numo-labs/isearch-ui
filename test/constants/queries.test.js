import { expect } from 'chai';
import { validate } from 'graphql/validation';
import { parse } from 'graphql/language';
import { buildClientSchema } from 'graphql/utilities';
import * as queries from '../../src/constants/queries';
import * as mutations from '../../src/constants/mutations';
import data from './helpers/schema.json';
const clientSchema = buildClientSchema(data.data);

function expectValid (schema, queryString) {
  const errors = validate(schema, parse(queryString));
  expect(errors).to.deep.equal([]);
}

describe.only('GraphQL constants', (done) => {
  describe('queries', (done) => {
    const queryKeys = Object.keys(queries);
    queryKeys.forEach((key) => {
      const query = queries[key];
      // if (query === queries) return;
      it('validates against GraphQL schema', (done) => {
        expectValid(clientSchema, query);
        done();
      });
    });
  });
});
