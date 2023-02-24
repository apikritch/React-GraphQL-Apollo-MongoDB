import { useQuery, gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products($filter: ProductFilterInput) {
    products(filter: $filter) {
      id
      name
      price
      image
      onSale
      category {
        name
      }
    }
  }
`;

export const GetProducts = (search, categoryId) => {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: {
        name: search ? search : undefined,
        categoryId: categoryId ? categoryId : undefined,
      },
    },
  });

  return {
    loading,
    error,
    data,
    refetch,
  };
};

// export const GET_PRODUCTS_BY_CATEGORY = gql`
//   query Category($categoryId: ID!) {
//     category(id: $categoryId) {
//       name
//       products {
//         id
//         name
//         price
//         image
//         onSale
//         category {
//           name
//         }
//       }
//     }
//   }
// `;
