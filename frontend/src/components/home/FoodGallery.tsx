import useSearch from 'src/hooks/useSearch'
import FoodDisplay from './FoodDisplay'

export default function FoodGallery() {
  const { data } = useSearch()
  const { dishes } = data || {}

  return (
    <div className='flex flex-wrap gap-10'>
      {dishes !== undefined &&
        dishes !== null &&
        dishes.map((dish) => <FoodDisplay key={dish.dishId} dish={dish} />)}
    </div>
  )
}
