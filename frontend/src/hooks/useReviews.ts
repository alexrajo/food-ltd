import React from 'react'

// Tanstack
import { useQuery } from '@tanstack/react-query'

// React Router
import { useParams } from 'react-router-dom'

// Utils
import { fetchReviews } from 'src/utils/api-calls'
import { useReviewsReturnType } from './HookTypes'

/**
 * Hooks which allows to fetch the reviews of a dish
 * @example
 * const MyComponent = () => {
 * const { data, isLoading, error, loadMore } = useReviews();
 * return (
 * <div>
 *    {data.map((review) => (
 *      <p>{review.content}</p>
 *    ))}
 *    <button onClick={() => loadMore()}>Load more</button>
 * </div>
 */
function useReviews(): useReviewsReturnType {
  /** Page number to allow pagination */
  const [page, setPage] = React.useState<number>(1)

  /** Get the id from the url */
  const params = useParams()
  const { id } = params

  /** Fetch the data */
  const { data, isLoading, error } = useQuery({
    queryKey: ['reviews', id, page],
    queryFn: () => fetchReviews(page, id),
    keepPreviousData: true,
    staleTime: 10000,
  })

  /** Loads more reviews */
  const loadMore = () => {
    setPage((prev) => prev + 1)
  }

  const reviewsData = data && data.reviews

  return { data: reviewsData, isLoading, error, loadMore }
}

export default useReviews
