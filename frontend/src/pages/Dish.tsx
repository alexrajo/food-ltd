import useDish from 'src/hooks/useDish';
import useReviews from 'src/hooks/useReviews';
import { Review } from 'src/types/types';
import stockFood from 'src/assets/mockFoodImage.jpg';
import RatingDisplay from 'src/components/RatingDisplay';
import ReviewDisplay from 'src/components/dish/ReviewDisplay';
import { useState } from 'react';

type TemperatureUnit = 'fahrenheit' | 'celsius';

/**
 * Converts a text containing a Fahrenheit temperature to Celsius.
 * @param text the text to convert
 * @returns the text with the Fahrenheit temperature converted to Celsius
 */
const fahrenheitTextToCelsius = (text: string) => {
  // Find the Fahrenheit temperature in the text and convert it to Celsius
  const match = text.match(/(\d+) ?°[F]/);

  if (match) {
    const fahrenheitValue = parseInt(match[1]);
    const celsiusCalc = Math.floor(((fahrenheitValue - 32) * 5) / 9);

    return text.replace(/(\d+) ?°[F]/, celsiusCalc + '°C');
  } else {
    return text;
  }
};

export default function DishPage() {
  const { data: dish, isLoading, error } = useDish();
  const {
    data: reviews,
    isLoading: reviewsAreLoading,
    error: reviewsError,
    loadMore,
  } = useReviews();
  const [temperatureUnit, setTemperatureUnit] =
    useState<TemperatureUnit>('fahrenheit');

  const { dishId, title, ingredients, instructions } = dish || {};

  const rating = reviewsAreLoading
    ? undefined
    : reviews !== undefined
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : undefined;

  return (
    <div className='w-full h-full overflow-y-scroll'>
      <div className='flex flex-col m-10 gap-10'>
        <div className='flex flex-col md:flex-row gap-10'>
          <div className='flex flex-col bg-white p-10 gap-10 w-full basis-2/3'>
            <div className='flex gap-10 flex-col xl:flex-row'>
              <img src={stockFood} className='rounded-md w-full xl:w-96' />
              <div className='flex flex-col'>
                <p className='text-2xl'>{title}</p>
                <p className='text-grayed-text'>800 kcal</p>
                <RatingDisplay key={`rating-${dishId}`} rating={rating} />
                {/* <HashLink
                  className='underline hover:cursor-pointer'
                  to={`/dish/${dishId}#reviews`}
                >
                  See reviews
                </HashLink> */}
                <div className='h-full flex flex-col justify-end'>
                  <div className='flex flex-col gap-1'>
                    <p className='font-semibold'>Temperature units</p>
                    <div className='flex gap-3'>
                      <button
                        onClick={() => setTemperatureUnit('fahrenheit')}
                        className={`border p-2 rounded-md ${
                          temperatureUnit === 'fahrenheit' && 'bg-selected'
                        }`}
                      >
                        Fahrenheit
                      </button>
                      <button
                        onClick={() => setTemperatureUnit('celsius')}
                        className={`border p-2 rounded-md ${
                          temperatureUnit === 'celsius' && 'bg-selected'
                        }`}
                      >
                        Celsius
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              {instructions !== undefined &&
                instructions.split('. ').map((instruction, index) => (
                  <div key={instruction}>
                    {index + 1}.{' '}
                    {temperatureUnit === 'fahrenheit'
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
          {reviews !== undefined &&
            reviews.map((review: Review) => <ReviewDisplay {...review} />)}
          <div className='flex justify-center'>
            <button className='border w-fit font-semibold p-3 rounded-md'>
              Load more
            </button>
          </div>
        </div>
      </div>
      <div className='w-full h-20' />
    </div>
  );
}
