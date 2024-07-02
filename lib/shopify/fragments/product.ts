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
    type: metafield(namespace: "custom", key: "type") {
      namespace
      key
      value
      id
    }
    color: metafield(namespace: "custom", key: "color") {
      namespace
      key
      value
      id
    }
    size: metafield(namespace: "custom", key: "size") {
      namespace
      key
      value
      id
    }
    material: metafield(namespace: "custom", key: "material") {
      namespace
      key
      value
      id
    }
    drop: metafield(namespace: "custom", key: "drop") {
      namespace
      key
      value
      id
    }
    category: metafield(namespace: "custom", key: "drop") {
      namespace
      key
      value
      id
    }
    model: metafield(namespace: "custom", key: "drop") {
      namespace
      key
      value
      id
    }
    modeldescription: metafield(namespace: "custom", key: "drop") {
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
