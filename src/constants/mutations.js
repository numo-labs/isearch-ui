export const MUTATION_START_SEARCH = `
mutation startSearch($query: String) {
  viewer {
    searchResultId(query: $query) {
      id
    }
  }
}
`;
