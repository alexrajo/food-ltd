import stockFood from 'src/assets/mockFoodImage.jpg';
import { Link } from 'react-router-dom';
import type { Dish } from 'src/types/types';

type FoodDisplayProps = {
  dish: Dish;
};

export default function FoodDisplay(props: FoodDisplayProps) {
  const { dish } = props;
  const { title, dishId: id } = dish;
  return (
    <Link to={`/dish/${id}`} className='flex gap-4 flex-col shadow-xl w-60  group cursor-pointer bg-white p-4'>
      <img alt='food' className='rounded-md' src={stockFood} />
      <div className='font-bold p-4 group-hover:underline'>{title}</div>
    </Link>
  );
}