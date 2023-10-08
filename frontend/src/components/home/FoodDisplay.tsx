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
    <Link to={`/dish/${id}`} className='flex gap-4 flex-col rounded-t-3xl shadow-xl w-60  group cursor-pointer'>
      <img alt='stockfood' className='rounded-t-3xl' src={stockFood} />
      <div className='font-bold p-4 group-hover:underline'>{title}</div>
    </Link>
  );
}
