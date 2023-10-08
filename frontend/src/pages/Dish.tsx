import useDish from 'src/hooks/useDish';
import useReviews from 'src/hooks/useReviews';
import { Review } from 'src/types/types';
import stockFood from 'src/assets/mockFoodImage.jpg';
import RatingDisplay from 'src/components/RatingDisplay';

export default function DishPage() {
  const { data: dish, isLoading, error } = useDish();
  const { data: reviews, isLoading: reviewsAreLoading, error: reviewsError, loadMore } = useReviews();

  const { dishId, title, ingredients, instructions } = dish || {};

  return (
    <div className='w-full h-full overflow-y-scroll'>
      <div className='flex flex-col m-10'>
        <div className='flex flex-row gap-10'>
          <div className='bg-white p-10 h-fit'>
            <p className='text-xl text-center'>Ingredients</p>
            <p className='text-lg text-center text-gray-400'>4 portions</p>
            <div>
              <ul className='list-disc gap-3'>
                {ingredients !== undefined &&
                  ingredients.map((ingredient) => (
                    <li key={ingredient} className='my-3'>
                      {ingredient}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className='flex flex-col bg-white p-10 gap-10'>
            <div className='flex flex-row gap-10'>
              <img src={stockFood} className='rounded-md w-96' />
              <div className='flex flex-col'>
                <p className='text-2xl'>{title}</p>
                <p className='text-gray-400'>800 kcal</p>
                <RatingDisplay key={`rating-${dishId}`} rating={4.4} />
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              {instructions !== undefined &&
                instructions.split('. ').map((instruction, index) => (
                  <div key={instruction}>
                    {index + 1}. {instruction}.
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          {reviews !== undefined &&
            reviews.map((review: Review) => (
              <div key={review.reviewId}>
                {review.reviewId} - {review.rating} - {review.comment}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
