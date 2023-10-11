import useDish from 'src/hooks/useDish';
import useReviews from 'src/hooks/useReviews';
import { Review } from 'src/types/types';
import stockFood from 'src/assets/mockFoodImage.jpg';
import RatingDisplay from 'src/components/RatingDisplay';
import ReviewDisplay from 'src/components/dish/ReviewDisplay';
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppRedux';
import { setCelsius, setFahrenheit } from 'src/redux/temperatureUnitReducer';
import { Link } from 'react-router-dom';
import cn from 'src/utils/cn';

/**
 * Converts a text containing a Fahrenheit temperature to Celsius.
 * @param text the text to convert
 * @returns the text with the Fahrenheit temperature converted to Celsius
 */
const fahrenheitTextToCelsius = (text: string) => {
  // Find the Fahrenheit temperature in the text and convert it to Celsius
  const match = text.match(/(\d+) ?°[F]/);

  if (match) {
    const fahrenheitValue = parseInt(match[1], 10);
    const celsiusCalc = Math.floor(((fahrenheitValue - 32) * 5) / 9);

    return text.replace(/(\d+) ?°[F]/, `${celsiusCalc} °C`);
  }
  return text
};

export default function DishPage() {
  const { data: dish, } = useDish();
  const {
    data: reviews,
    isLoading: reviewsAreLoading,
  } = useReviews();

  const temperatureUnit = useAppSelector((state) => state.temperatureUnit);
  const dispatch = useAppDispatch();

  const { dishId, title, ingredients, instructions } = dish || {};

  const rating = reviewsAreLoading || !reviews
    ? undefined
    : reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <div className='w-full h-full overflow-y-scroll'>
      <div className='flex flex-col m-10 gap-10'>
        <div className='flex flex-col md:flex-row gap-10'>
          <div className='flex flex-col bg-white p-10 gap-10 w-full basis-2/3'>
            <div className='flex gap-10 flex-col xl:flex-row'>
              <img src={stockFood} className='rounded-md w-full xl:w-96' />
              <div className='flex flex-col'>
                <p className='text-2xl'>{title}</p>
                {/* <p className='text-grayed-text'>800 kcal</p> */}
                <div className='mt-4'>
                  <RatingDisplay key={`rating-${dishId}`} rating={rating} alt='rating' />
                </div>
                {/* <HashLink
                  className='underline hover:cursor-pointer'
                  to={`/dish/${dishId}#reviews`}
                >
                  See reviews
                </HashLink> */}
                <Link
                  className='border rounded-md my-3 p-2 w-full sm:w-fit text-center'
                  to={'write-review'}
                >
                  Write a review
                </Link>
                <div className='h-full flex flex-col justify-end'>
                  <div className='flex flex-col gap-1'>
                    <p className='font-semibold'>Temperature units</p>
                    <div className='flex gap-3'>
                      <button
                        onClick={() => dispatch(setFahrenheit())}
                        className={cn('border p-2 rounded-md', temperatureUnit.value === 'fahrenheit' && 'bg-selected')}
                        type='button'
                      >
                        Fahrenheit
                      </button>
                      <button
                        onClick={() => dispatch(setCelsius())}
                        className={cn('border p-2 rounded-md', temperatureUnit.value === 'celsius' && 'bg-selected')}
                        type='button'
                      >
                        Celsius
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              {instructions?.split('. ').map((instruction, index) => (
                  <div key={instruction}>
                    {index + 1}.{' '}
                    {temperatureUnit.value === 'fahrenheit'
                      ? instruction
                      : fahrenheitTextToCelsius(instruction)}
                    .
                  </div>
                ))}
            </div>
          </div>
          <div className='bg-white p-10 h-fit w-full basis-1/3'>
            <p className='text-xl text-center'>Ingredients</p>
            <p className='text-lg text-center text-grayed-text'>4 portions</p>
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
        </div>
        <div className='flex flex-col bg-white p-10 gap-10' id='reviews'>
          <div className='border-b pb-5'>
            <p className='text-xl text-center'>Reviews</p>
          </div>
          {reviews?.map((review: Review) => <ReviewDisplay review={review} />)}
          <div className='flex justify-center'></div>
        </div>
      </div>
      <div className='w-full h-20' />
    </div>
  );
}
