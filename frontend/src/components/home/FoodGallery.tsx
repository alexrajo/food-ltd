import mockData from 'src/assets/mockdata.json';
import FoodDisplay from './FoodDisplay';
import type { Dish } from 'src/types/types';

export default function FoodGallery() {
  return (
    <div className='flex gap-10 flex-wrap'>
      {mockData.map((f) => {
        const dish = f as Dish;

        return <FoodDisplay key={f.dishId} dish={dish} />;
      })}
    </div>
  );
}
