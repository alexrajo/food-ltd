import React from 'react';

// Tanstack
import { useQuery } from '@tanstack/react-query';

// React Router
import { useParams } from 'react-router-dom';

// Utils
import { fetchReviews } from 'src/utils/api-calls';
import { useReviewsReturnType } from './HookTypes';

/**
 * Hooks which allows to fetch the reviews of a dish
 * @example
 * const MyComponent = () => {
 * const { data, isLoading, error, paginate } = useReviews();
 * return (
 * <div>
 *    {data.map((review) => (
 *      <p>{review.content}</p>
 *    ))}
 *    <button onClick={() => paginate()}>Next Page</button>
 * </div>
 */
function useReviews(): useReviewsReturnType {
  /** Page number to allow pagination */
  const [page, setPage] = React.useState<number>(0);

  /** Get the id from the url */
  const params = useParams();
  const { id } = params;

  /** Fetch the data */
  const { data, isLoading, error } = useQuery({
    queryKey: ['reviews', page],
    queryFn: () => fetchReviews(page, id),
    keepPreviousData: true,
  });

  /** Pagination */
  const paginate = () => {
    setPage((prev) => prev + 1);
  };

  return { data, isLoading, error, paginate };
}

export default useReviews;
