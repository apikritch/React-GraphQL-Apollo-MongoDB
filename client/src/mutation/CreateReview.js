import { gql } from "@apollo/client";

export const ADD_REVIEW = gql`
  mutation AddReview($input: AddReviewInput!) {
    addReview(input: $input) {
      id
      title
    }
  }
`;
