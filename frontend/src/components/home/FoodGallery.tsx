import FoodDisplay from './FoodDisplay';
import useSearch from 'src/hooks/useSearch';

export default function FoodGallery() {
  const { data } = useSearch()
  
    return (
      <div className="flex gap-10 flex-wrap">
        {data?.map((dish) => (
          <FoodDisplay key={dish.dishId} dish={dish} />
        ))}
      </div>
    );
  }