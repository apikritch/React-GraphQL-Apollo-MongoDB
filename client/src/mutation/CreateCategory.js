import { gql } from "@apollo/client";

export const ADD_CATEGORY = gql`
  mutation AddCategory($input: AddCategoryInput!) {
    addCategory(input: $input) {
      id
      name
    }
  }
`;
