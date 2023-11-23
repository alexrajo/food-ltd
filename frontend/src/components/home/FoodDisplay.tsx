import { Link } from 'react-router-dom'
import type { Dish } from 'src/types/types'
import { memo } from 'react'
import RatingDisplay from 'src/components/RatingDisplay'
import { useAppDispatch } from 'src/hooks/useAppRedux'
import { closeFilterMenu } from 'src/redux/modalsReducer'
import Placeholder from '../dish/DisplayPlaceholder'

type FoodDisplayProps = {
  dish: Dish
}

/**
 * Used on the main page, to show every dish returned after search, filter etc. Each links to
 * the individual page for that dish.
 */
const FoodDisplay = memo((props: FoodDisplayProps) => {
  const { dish } = props;
  const { title, dishId: id, imageName, averageRating, reviewCount } = dish;

  const dispatch = useAppDispatch()

  return (
    <Link
      to={`/dish/${id}`}
      onClick={() => dispatch(closeFilterMenu())}
      className=' w-full p-2 sm:basis-1/2 xl:basis-1/3 3xl:basis-1/4'
    >
      <div className='bg- group relative flex h-full w-full cursor-pointer flex-col bg-white shadow-xl transition-all ease-in-out hover:scale-105 dark:bg-secondary '>
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
})

export default FoodDisplay
