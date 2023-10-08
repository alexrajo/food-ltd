import useDish from 'src/hooks/useDish';
import useReviews from 'src/hooks/useReviews';
import { Review } from 'src/types/types';
import stockFood from 'src/assets/mockFoodImage.jpg';
import RatingDisplay from 'src/components/RatingDisplay';

export default function DishPage() {
  const { data: dish, isLoading, error } = useDish();
  const { data: reviews, isLoading: reviewsAreLoading, error: reviewsError, paginate } = useReviews();

  const { dishId, title } = dish || {};

  return (
    <div className='flex'>
      <div className='m-10 bg-white'>
        <div className='flex flex-row p-10 gap-10'>
          <img src={stockFood} className='rounded-md w-96' />
          <div className='flex flex-col'>
            <p className='text-2xl'>{title}</p>
            <p className='text-gray-400'>800 kcal</p>
            <div>
              <RatingDisplay rating={4.6} />
            </div>
          </div>
        </div>
        {reviews !== undefined &&
          reviews.map((review: Review) => (
            <div key={review.reviewId}>
              {review.reviewId} - {review.rating} - {review.comment}
            </div>
          ))}
      </div>
    </div>
  );
}
