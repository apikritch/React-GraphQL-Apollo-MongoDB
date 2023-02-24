const categoryTypeDefs = `#graphql
     type Query {
        categories(filter:CategoryFilterInput): [Category!]!
        category(id: ID): Category
    }

    type Mutation {
        addCategory(input: AddCategoryInput!): Category!
        deleteCategory(id: ID!): Boolean!
        updateCategory(id:ID!, input: UpdateCategoryInput!): Category
    }

    type Category {
        id: String!
        name: String!
        image: String!
        products(filter:ProductFilterInput): [Product!]!
    }

    input CategoryFilterInput {
        name:String
    }

    input AddCategoryInput {
        name: String!
        image: String!
    }

    input UpdateCategoryInput {
        name: String!
        image: String!
    }
`;

export default categoryTypeDefs;
