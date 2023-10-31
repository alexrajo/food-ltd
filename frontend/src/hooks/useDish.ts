import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchDish } from 'src/utils/api-calls'
import { useDishReturnType } from './HookTypes'

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
  const params = useParams()
  const { id } = params

  /** Fetches data about the dish by the id in the URL */
  const { data, isLoading, error } = useQuery({
    queryKey: ['dish', id],
    queryFn: () => fetchDish(id),
  })

  const dishData = data && data.dish

  return { data: dishData, isLoading, error }
}

export default useDish
