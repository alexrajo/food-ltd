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
  return text;
};

export default function DishPage() {
  const { data: dishData } = useDish();
  const { data: reviewsData, isLoading: reviewsAreLoading } = useReviews();

  const { dish } = dishData || {};
  const { reviews } = reviewsData || {};

  const temperatureUnit = useAppSelector((state) => state.temperatureUnit);
  const dispatch = useAppDispatch();

  const { dishId, title, ingredients, instructions, imageName } = dish || {};

  const rating =
    reviewsAreLoading || !reviews
      ? undefined
      : reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className='h-full w-full overflow-y-scroll'>
      <div className='m-10 flex flex-col gap-10'>
        <div className='flex flex-col gap-10 md:flex-row'>
          <div className='flex w-full basis-2/3 flex-col gap-10 light:bg-lime dark:bg-secondarydark p-4'>
            <div className='flex flex-col gap-10 xl:flex-row'>
              <img
                src={`http://it2810-43.idi.ntnu.no/images/${imageName}.jpg`}
                className=' object-cover'
                alt='food'
              />
              <div className='flex flex-col'>
                <p className='text-2xl'>{title}</p>
                {/* <p className='text-grayed-text'>800 kcal</p> */}
                <div className='mt-4'>
                  <RatingDisplay key={`rating-${dishId}`} rating={rating} />
                </div>
                {/* <HashLink
                  className='underline hover:cursor-pointer'
                  to={`/dish/${dishId}#reviews`}
                >
                  See reviews
                </HashLink> */}
                <Link
                  className='my-3 w-full rounded-md border p-2 text-center sm:w-fit'
                  to='write-review'
                >
                  Write a review
                </Link>
                <div className='flex h-full flex-col justify-end'>
                  <div className='flex flex-col gap-1'>
                    <p className='font-semibold'>Temperature units</p>
                    <div className='flex gap-3'>
                      <button
                        onClick={() => dispatch(setFahrenheit())}
                        className={cn(
                          'rounded-md border p-2',
                          temperatureUnit.value === 'fahrenheit' && ' bg-tigereye text-white'
                        )}
                        type='button'
                      >
                        Fahrenheit
                      </button>
                      <button
                        onClick={() => dispatch(setCelsius())}
                        className={cn(
                          'rounded-md border p-2',
                          temperatureUnit.value === 'celsius' && 'bg-tigereye text-white'
                        )}
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
          <div className='h-fit w-full basis-1/3 light:bg-lime dark:bg-secondarydark p-10'>
            <p className='text-center text-xl'>Ingredients</p>
            <p className='text-center text-lg text-grayed-text'>4 portions</p>
            <div>
              <ul className='list-disc gap-3'>
                {ingredients
                  ?.slice(1, -2)
                  .split("',")
                  .map((ingredient) => {
                    ingredient = ingredient.replace("'", '');
                    return (
                      <li key={ingredient} className='my-3'>
                        {ingredient}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-10 light:bg-lime dark:bg-secondarydark p-10' id='reviews'>
          <div className='border-b pb-5'>
            <p className='text-center text-xl'>Reviews</p>
          </div>
          {reviews?.map((review: Review) => (
            <ReviewDisplay key={review.reviewId} review={review} />
          ))}
          <div className='flex justify-center'></div>
        </div>
      </div>
      <div className='h-20 w-full' />
    </div>
  );
}
