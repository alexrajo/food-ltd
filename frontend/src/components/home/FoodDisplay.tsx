import stockFood from 'src/assets/mockFoodImage.jpg'
import { Link } from 'react-router-dom'
import type { Dish } from 'src/types/types'

type FoodDisplayProps = {
  dish: Dish
}

export default function FoodDisplay(props: FoodDisplayProps) {
  const { dish } = props
  const { title, dishId: id } = dish
  return (
    <Link
      to={`/dish/${id}`}
      className='group flex w-60 cursor-pointer flex-col  gap-4 bg-white p-4 shadow-xl'
    >
      <img alt='food' className='rounded-md' src={stockFood} />
      <div className='p-4 font-bold group-hover:underline'>{title}</div>
    </Link>
  )
}
