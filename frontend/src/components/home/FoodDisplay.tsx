import { Link } from 'react-router-dom'
import type { Dish } from 'src/types/types'
import { memo } from 'react'
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
    <Link
      to={`/dish/${id}`}
      className=' 3xl:basis-1/4 w-full p-2 sm:basis-1/2 xl:basis-1/3'
    >
      <div className='bg- group relative flex h-full w-full cursor-pointer flex-col bg-white shadow-xl transition-all ease-out hover:scale-105 dark:bg-secondary '>
        <div className='  flex h-full w-full items-center bg-white dark:bg-secondarydark'>
          {imageName === '#NAME?' ? (
            <Placeholder />
          ) : (
            <img
              alt='food'
              className='w-full'
              src={`http://it2810-43.idi.ntnu.no/images/${imageName}.jpg`}
            />
          )}
        </div>
        <div className='px-4 py-4 font-bold text-black '>
          <p className=' line-clamp-1 text-xs lg:text-sm'>{title}</p>
        </div>
        <div className=' h-2 w-full bg-primary dark:bg-oldbrick' />
        <RatingDisplay
          rating={averageRating}
          // rating={undefined}
          textStyle='sm:hidden md:block text-xs md:text-sm xl:text-md'
          reviewCount={reviewCount}
          className='xl:text-md absolute left-2 top-2 z-30 w-fit rounded-xl bg-black bg-opacity-50 p-2 text-xs text-white md:text-sm'
        />
      </div>
    </Link>
  )
}

const Placeholder = () => (
  <div
    role='output'
    className='flex aspect-video grow items-center justify-center'
  >
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
