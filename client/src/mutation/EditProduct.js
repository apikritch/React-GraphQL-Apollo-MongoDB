import { gql } from "@apollo/client";

export const EDIT_PRODUCT = gql`
  mutation UpdateProduct($updateProductId: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $updateProductId, input: $input) {
      id
      name
    }
  }
`;
