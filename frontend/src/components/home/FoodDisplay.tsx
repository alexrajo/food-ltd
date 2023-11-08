import { Link } from 'react-router-dom'
import type { Dish } from 'src/types/types'
import { memo, useEffect, useRef, useState } from 'react'
import RatingDisplay from 'src/components/RatingDisplay'

type FoodDisplayProps = {
  dish: Dish
}

/**
 * Used on the main page, to show every dish returned after search, filter etc. Each links to
 * the individual page for that dish.
 */
function FoodDisplay(props: FoodDisplayProps) {
  const { dish } = props
  const { title, dishId: id, imageName, averageRating, reviewCount } = dish

  return (
    <Link to={`/dish/${id}`} className=' basis-1/2 p-2 lg:basis-1/3'>
      <div className='group relative flex cursor-pointer flex-col bg-white shadow-xl transition-all ease-out hover:scale-105 dark:bg-secondary '>
        <div className='3xl:h-96 lg:h-42 flex h-32 w-full bg-white object-cover dark:bg-secondarydark md:h-40 xl:h-64 2xl:h-72'>
          {imageName === '#NAME?' ? (
            <Placeholder />
          ) : (
            <img
              alt='food'
              className='w-full rounded-sm object-cover'
              src={`http://it2810-43.idi.ntnu.no/images/${imageName}.jpg`}
            />
          )}
        </div>
        <div className='p-4 font-bold text-black  '>
          <p className=' line-clamp-1 text-xs lg:text-sm'>{title}</p>
          <RatingDisplay
            rating={averageRating}
            // rating={undefined}
            textStyle='hidden sm:block text-xs md:text-sm xl:text-md'
            reviewCount={reviewCount}
          />
        </div>
      </div>
    </Link>
  )
}

const Placeholder = () => (
  <div role='output' className='flex h-full w-full items-center justify-center'>
    <svg
      className='h-10 w-10 text-gray-200 dark:text-gray-600'
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      viewBox='0 0 16 20'
    >
      <path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z' />
      <path d='M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z' />
    </svg>
    <span className='sr-only'>Loading...</span>
  </div>
)

export default memo(FoodDisplay)
