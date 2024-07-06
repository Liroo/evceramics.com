export const getMetaobjectQuery = /* GraphQL */ `
  query getMetaobjectQuery($handle: String!, $type: String!, $language: LanguageCode)
  @inContext(language: $language) {
    metaobject(handle: { handle: $handle, type: $type }) {
      gallery: field(key: "gallery") {
        type
        value
        key
        references(first: 250) {
          edges {
            node {
              __typename
              ... on MediaImage {
                id
                image {
                  url
                }
              }
            }
          }
        }
      }
      id
      handle
    }
  }
`;
