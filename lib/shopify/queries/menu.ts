export const getMenuQuery = /* GraphQL */ `
  query getMenu($handle: String!, $locale: LanguageCode) @inContext(language: $locale) {
    menu(handle: $handle) {
      id
      items {
        title
        url
      }
    }
  }
`;
