import { useQuery, gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query Product($productId: ID!) {
    product(id: $productId) {
      category {
        id
        name
      }
      description
      image
      name
      onSale
      price
      quantity
      reviews {
        rating
        id
        title
        date
        comment
      }
    }
  }
`;

export const GetProduct = (productId) => {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCT, {
    variables: {
      productId,
    },
  });

  return {
    loading,
    error,
    data,
    refetch,
  };
};
