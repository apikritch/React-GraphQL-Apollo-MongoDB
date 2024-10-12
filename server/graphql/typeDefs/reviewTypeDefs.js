const reviewTypeDefs = `#graphql
    type Query {
        reviews: [Review!]!
    }

    type Mutation {
        addReview(input: AddReviewInput!): Review!
        deleteReview(id: ID!): Boolean!
        updateReview(id:ID!, input: UpdateReviewInput!): Review
    }

    type Review {
        id: ID!
        date: String!
        title: String!
        comment: String!
        rating: Int!
    }

    input AddReviewInput {
        title: String! 
        comment: String! 
        rating: Int! 
        productId: ID! 
    }

    input UpdateReviewInput {
        title: String!
        comment: String!
        rating: Int!
        productId: ID!
    }
`;

export default reviewTypeDefs;
