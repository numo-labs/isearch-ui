export const MUTATION_START_SEARCH = `
mutation startSearch($query: String, $clientId: String, $connectionId: String) {
  viewer {
    searchResultId(query: $query, clientId: $clientId, connectionId: $connectionId) {
      id
    }
  }
}
`;
