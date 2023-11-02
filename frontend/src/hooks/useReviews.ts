import React, { useEffect } from 'react'

// Tanstack
import { useQuery } from '@tanstack/react-query'

// React Router
import { useParams } from 'react-router-dom'

// Utils
import { fetchReviews } from 'src/utils/api-calls'

import { useReviewsReturnType } from './HookTypes'
import type { Review } from 'src/types/types'

/**
 * Hook that allows fetching the reviews of a dish
 * @example
 * const MyComponent = () => {
 * const { data, isLoading, error, loadMore, hasMore } = useReviews();
 * return (
 * <div>
 *    {data.map((review) => (
 *      <p>{review.content}</p>
 *    ))}
 *    <button onClick={() => loadMore()}>Load more</button>
 * </div>
 */
function useReviews(pageSize: number = 3): useReviewsReturnType {
  /** Page number to allow pagination */
  const [page, setPage] = React.useState<number>(1)
  const [reviewsData, setReviewsData] = React.useState<Review[]>([])
  const [hasMore, setHasMore] = React.useState<boolean>(true)

  /** Get the id from the url */
  const params = useParams()
  const { id } = params

  /** Fetch the data */
  const { data, isLoading, error } = useQuery({
    queryKey: ['reviews', id, page],
    queryFn: () => fetchReviews(page, id, pageSize),
    keepPreviousData: true,
    staleTime: 10000,
  })

  /** Loads more reviews */
  const loadMore = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    if (data !== undefined) {
      if (data.reviews.data.length < pageSize) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }
      //add data to reviewsData but with the duplicates removed
      setReviewsData((prev) => {
        const newData = [...prev, ...data.reviews.data]
        const uniqueData = newData.filter(
          (review, index, self) =>
            index === self.findIndex((t) => t.reviewId === review.reviewId),
        )
        return uniqueData
      })
    }
  }, [data])

  return { data: { data: reviewsData }, isLoading, error, loadMore, hasMore }
}

export default useReviews
