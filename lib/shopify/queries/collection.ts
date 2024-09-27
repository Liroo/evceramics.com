import { collectionFragment } from '../fragments/collection';
import productFragment from '../fragments/product';

export const getCollectionQuery = /* GraphQL */ `
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      ...collection
    }
  }
  ${collectionFragment}
`;

export const getCollectionsQuery = /* GraphQL */ `
  query getCollections {
    collections(first: 100, sortKey: TITLE) {
      edges {
        node {
          ...collection
        }
      }
    }
  }
  ${collectionFragment}
`;

export const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionProducts($handle: String!, $reverse: Boolean, $locale: LanguageCode)
  @inContext(language: $locale) {
    collection(handle: $handle) {
      products(reverse: $reverse, first: 100) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`;
