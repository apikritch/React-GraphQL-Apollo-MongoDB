import { gql } from "@apollo/client";

export const EDIT_CATEGORY = gql`
  mutation UpdateCategory(
    $updateCategoryId: ID!
    $input: UpdateCategoryInput!
  ) {
    updateCategory(id: $updateCategoryId, input: $input) {
      id
      name
    }
  }
`;
