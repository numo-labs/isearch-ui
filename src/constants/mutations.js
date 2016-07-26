export const MUTATION_START_SEARCH = `
mutation startSearch($query: String, $clientId: String, $connectionId: String) {
  viewer {
    startSearch(query: $query, clientId: $clientId, connectionId: $connectionId) {
      id
    }
  }
}
`;
