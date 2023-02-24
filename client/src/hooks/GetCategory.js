import { useQuery, gql } from "@apollo/client";

export const GET_CATEGORY = gql`
  query Category($categoryId: ID) {
    category(id: $categoryId) {
      name
    }
  }
`;

export const GetCategory = (categoryId) => {
  const { loading, error, data, refetch } = useQuery(GET_CATEGORY, {
    variables: {
      categoryId,
    },
  });

  return {
    loading,
    error,
    data,
    refetch,
  };
};
