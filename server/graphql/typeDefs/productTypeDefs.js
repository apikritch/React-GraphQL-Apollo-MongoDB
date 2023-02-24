const productTypeDefs = `#graphql
    type Query {
        products(filter: ProductFilterInput): [Product!]!
        product(id: ID!): Product
    }

    type Mutation {
        addProduct(input: AddProductInput!): Product!
        deleteProduct(id: ID!): Boolean!
        updateProduct(id:ID!, input: UpdateProductInput!): Product
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        quantity: Int!
        price: Float!
        image: String!
        onSale: Boolean!
        category: Category
        reviews: [Review!]!
    }

    input ProductFilterInput {
        name: String
        categoryId: ID
        onSale: Boolean
        avgRating: Int
    }

    input AddProductInput {
        name: String!
        description: String!
        quantity: Int!
        price: Float!
        image: String!
        onSale: Boolean!
        categoryId: ID
    }

    input UpdateProductInput {
        name: String!
        description: String!
        quantity: Int!
        price: Float!
        image: String!
        onSale: Boolean!
        categoryId: ID
    }
`;

export default productTypeDefs;
