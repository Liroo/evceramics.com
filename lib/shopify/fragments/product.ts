import { collectionFragment } from './collection';
import imageFragment from './image';

const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    collections(first: 100) {
      edges {
        node {
          ...collection
        }
      }
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    availableForSale
    totalInventory
    tags
    metafields(
      identifiers: [
        { namespace: "custom", key: "type" }
        { namespace: "custom", key: "color" }
        { namespace: "custom", key: "size" }
        { namespace: "custom", key: "material" }
        { namespace: "custom", key: "drop" }
      ]
    ) {
      namespace
      key
      value
      id
    }
    updatedAt
  }
  ${imageFragment}
  ${collectionFragment}
`;

export default productFragment;
