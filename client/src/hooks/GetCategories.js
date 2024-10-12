import { useQuery, gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query Categories($filter: CategoryFilterInput) {
    categories(filter: $filter) {
      id
      name
      image
    }
  }
`;

export const GetCategories = (search) => {
  const { loading, error, data, refetch } = useQuery(GET_CATEGORIES, {
    variables: {
      filter: { name: search ? search : undefined },
    },
  });

  return {
    loading,
    error,
    data,
    refetch,
  };
};
