import useDish from 'src/hooks/useDish'
import useReviews from 'src/hooks/useReviews'
import { Review } from 'src/types/types'
import RatingDisplay from 'src/components/RatingDisplay'
import ReviewDisplay from 'src/components/dish/ReviewDisplay'
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppRedux'
import { setCelsius, setFahrenheit } from 'src/redux/temperatureUnitReducer'
import { Link } from 'react-router-dom'
import cn from 'src/utils/cn'
import BackIcon from 'src/components/icons/BackIcon'
import InfiniteScroll from 'react-infinite-scroll-component'

const ABBREVIATION_ALIASES = {
  'Tbsp.': 'Tbsp@',
  'tbsp.': 'tbsp@',
  'Tbsps.': 'Tbsps@',
  'tbsps.': 'tbsps@',
  'Tsp.': 'Tsp@',
  'tsp.': 'tsp@',
  'Tsps.': 'Tsps@',
  'tsps.': 'tsps@',
  'Oz.': 'Oz@',
  'oz.': 'oz@',
}

/**
 * Converts a text containing a Fahrenheit temperature to Celsius.
 * @param text the text to convert
 * @returns the text with the Fahrenheit temperature converted to Celsius
 */
const fahrenheitTextToCelsius = (text: string) => {
  // Find the Fahrenheit temperature in the text and convert it to Celsius
  const match = text.match(/(\d+) ?°[F]/)

  if (match) {
    const fahrenheitValue = parseInt(match[1], 10)
    const celsiusCalc = Math.floor(((fahrenheitValue - 32) * 5) / 9)

    return text.replace(/(\d+) ?°[F]/, `${celsiusCalc} °C`)
  }
  return text
}

/**
 * Turns a string of instructions into a list of instructions.
 * @param instructions the instructions text to turn into a list
 * @returns the instructions as a list of JSX elements
 */
const listifyInstructions = (
  instructions?: string,
  temperatureUnit?: string,
) => {
  if (instructions === undefined) {
    return undefined
  }

  let instr = instructions
  Object.entries(ABBREVIATION_ALIASES).forEach(([key, value]) => {
    const regex = new RegExp(key, 'g')
    instr = instr!.replace(regex, value)
  })

  const splitInstructions = instr.split(/\.(?: |\n)/g)

  return splitInstructions.map((instruct, index) => {
    const instruction =
      temperatureUnit === 'celsius'
        ? fahrenheitTextToCelsius(instruct)
        : instruct
    return (
      <div key={instruction}>
        {index + 1}. {instruction.replace(/@/g, '.')}
        {index !== splitInstructions.length - 1 && '.'}
      </div>
    )
  })
}

export default function DishPage() {
  const { data: dishData } = useDish()
  const {
    data: reviewsData,
    hasMore: hasMoreReviews,
    loadMore: loadMoreReviews,
  } = useReviews()

  const { data: dish } = dishData ?? {}
  const { data: reviews } = reviewsData ?? {}

  const temperatureUnit = useAppSelector((state) => state.temperatureUnit)
  const dispatch = useAppDispatch()

  const {
    dishId,
    title,
    ingredients,
    instructions,
    imageName,
    averageRating: rating,
  } = dish ?? {}

  if (!dish) {
    return <div />
  }
  return (
    <div className='h-full w-full overflow-y-scroll  p-4 md:p-20'>
      <div className=' flex flex-col gap-2'>
        <Link
          to='/'
          className=' flex cursor-pointer flex-row items-center gap-2 bg-transparent p-2 dark:bg-secondarydark'
        >
          <BackIcon />
          Back
        </Link>

        <div className='flex flex-col gap-2 md:flex-row'>
          <div className='flex w-full basis-2/3 flex-col gap-10 bg-white p-4 drop-shadow-md dark:bg-secondarydark'>
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
                          temperatureUnit.value === 'fahrenheit' &&
                            'bg-secondary text-black',
                        )}
                        type='button'
                      >
                        Fahrenheit
                      </button>
                      <button
                        onClick={() => dispatch(setCelsius())}
                        className={cn(
                          'rounded-md border p-2',
                          temperatureUnit.value === 'celsius' &&
                            'bg-secondary text-black',
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
              {listifyInstructions(instructions, temperatureUnit.value)}
            </div>
          </div>
          <div className='h-fit w-full basis-1/3 bg-white p-10 drop-shadow-md dark:bg-secondarydark'>
            <p className='text-center text-xl'>Ingredients</p>
            <p className='text-center text-lg text-grayed-text'>4 portions</p>
            <div>
              <ul className='list-disc gap-3'>
                {ingredients
                  ?.slice(1, -2)
                  .split("',")
                  .map((ingred) => {
                    const ingredient = ingred.replace("'", '')
                    return (
                      <li key={ingredient} className='my-3'>
                        {ingredient}
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div
          className='flex flex-col gap-10 bg-white p-10 drop-shadow-md dark:bg-secondarydark'
          id='reviews'
        >
          <div className='border-b pb-5'>
            <p className='text-center text-xl'>Reviews</p>
          </div>
          {reviews !== undefined && (
            <InfiniteScroll
              dataLength={reviews.length}
              hasMore={hasMoreReviews}
              next={loadMoreReviews}
              loader={<p>Loading more...</p>}
              endMessage={
                reviews.length === 0 ? (
                  <p>No reviews exist yet.</p>
                ) : (
                  <p>No more reviews to load.</p>
                )
              }
              className='flex flex-col gap-5'
            >
              {reviews.map((review: Review) => (
                <ReviewDisplay key={review.reviewId} review={review} />
              ))}
            </InfiniteScroll>
          )}
        </div>
      </div>
      <div className='h-20 w-full' />
    </div>
  )
}
