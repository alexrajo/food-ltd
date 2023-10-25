import useSearch from 'src/hooks/useSearch'
import FoodDisplay from './FoodDisplay'

/**
 * Container for all FoodDisplay components on the main page.
 */
export default function FoodGallery() {
  const { data } = useSearch()

  return (
    <div className='flex flex-wrap gap-10'>
      {data?.map((dish) => <FoodDisplay key={dish.dishId} dish={dish} />)}
    </div>
  )
}
