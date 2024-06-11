export const getTranslatableResources = /* GraphQL */ `
  query getTranslatableResources($resourceId: String!) {
    translatableResource(resourceId: $resourceId) {
      resourceId
      translatableContent {
        key
        value
        digest
        locale
      }
    }
  }
`;
