import stockFood from 'src/assets/mockFoodImage.jpg'
import { Link } from 'react-router-dom'
import type { Dish } from 'src/types/types'
import pin from 'src/assets/thumbtack.png'

type FoodDisplayProps = {
  dish: Dish
}

/**
 * Used on the main page, to show every dish returned after search, filter etc. Each links to
 * the individual page for that dish.
 */
export default function FoodDisplay(props: FoodDisplayProps) {
  const { dish } = props
  const { title, dishId: id, imageName } = dish

  return (
    <Link
      to={`/dish/${id}`}
      className=' basis-1/1 p-2 sm:basis-1/2 lg:basis-1/3'
    >
      <div className='group relative flex cursor-pointer flex-col bg-white shadow-xl transition-all ease-out hover:scale-105 dark:bg-secondary '>
        <img
          alt='food'
          className='rounded-sm object-cover'
          src={`http://it2810-43.idi.ntnu.no/images/${imageName}.jpg`}
        />

        <div className='p-4 font-bold text-black  '>
          <p className=' line-clamp-1 text-xs lg:text-sm'>{title}</p>
        </div>
      </div>
    </Link>
  )
}
