import useSearch from 'src/hooks/useSearch';
import FoodDisplay from './FoodDisplay';
import type { Dish } from 'src/types/types';

export default function FoodGallery() {
  const { data } = useSearch();

  return (
    <div className='flex gap-10 flex-wrap'>{data?.map((dish) => <FoodDisplay key={dish.dishId} dish={dish} />)}</div>
  );
}
