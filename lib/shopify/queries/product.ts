import productFragment from '../fragments/product';

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!, $language: LanguageCode) @inContext(language: $language) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts($reverse: Boolean, $query: String) {
    products(reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!, $locale: LanguageCode)
  @inContext(language: $locale) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;
