import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Dish } from 'src/types/types';
import { fetchDish } from 'src/utils/api-calls';

type useDishReturnType = {
  /**
   * The data about the dish
   */
  data: Dish | undefined;
  /**
   * If the data is loading
   */
  isLoading: boolean;
  /**
   * If there is an error
   */
  error: unknown;
};

/**
 * Fetches data about the dish by the id in the URL
 *
 * @example
 *
 *
 * const MyComponent = () => {
 * const { data, isLoading, error } = useDish();
 *
 * if (isLoading) return <p>Loading...</p>;
 * if (error) return <p>Something went wrong...</p>;
 * return (
 * <div>
 *    <h1>{data.name}</h1>
 *    <p>{data.description}</p>
 * </div>
 *
 */
function useDish(): useDishReturnType {
  /** Get the id from the url */
  const params = useParams();
  const { id } = params;

  /** Fetches data about the dish by the id in the URL */
  const { data, isLoading, error } = useQuery({
    queryKey: ['dish', id],
    queryFn: () => fetchDish(id),
  });

  return { data, isLoading, error };
}

export default useDish;