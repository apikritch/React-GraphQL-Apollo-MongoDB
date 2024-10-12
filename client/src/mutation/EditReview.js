import { gql } from "@apollo/client";

export const EDIT_REVIEW = gql`
  mutation UpdateReview($updateReviewId: ID!, $input: UpdateReviewInput!) {
    updateReview(id: $updateReviewId, input: $input) {
      id
      title
    }
  }
`;
