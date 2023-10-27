import useSearch from 'src/hooks/useSearch';
import FoodDisplaySkeleton from 'src/components/home/FoodDisplaySkeleton';
import FoodDisplay from 'src/components/home/FoodDisplay';
import Lottie from 'lottie-react';
import empty from 'src/assets/empty.json';
import { Dish } from 'src/types/types';

/**
 * Container for all FoodDisplay components on the main page.
 */
type ComponentProps = {
  isLoading: boolean;
  dishes: Dish[];
};
export default function FoodGallery(props: ComponentProps) {
  const { isLoading, dishes } = props;

  if (dishes === undefined || dishes.length == 0) {
    return (
      <div className='flex w-full h-full items-center justify-center flex-col'>
        <p className='text-2xl'>No dishes found</p>
        <Lottie animationData={empty} loop={false} className=' w-1/2 h-1/2' />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex flex-wrap gap-10'>
        {Array.from({ length: 10 }).map((_, i) => (
          <FoodDisplaySkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className='flex flex-wrap '>
      {dishes !== undefined &&
        dishes !== null &&
        dishes.map((dish) => <FoodDisplay key={dish.dishId} dish={dish} />)}
    </div>
  );
}
