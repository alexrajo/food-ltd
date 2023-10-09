import stockFood from 'src/assets/mockFoodImage.jpg';
import { Dish } from 'src/types/types';

export default function FoodDisplay({ dish }: { dish: Dish }) {
    const { title } = dish;
    return (
      <div className="flex gap-4 flex-col rounded-t-3xl shadow-xl w-60  group cursor-pointer">
        <img alt="food image" className="rounded-t-3xl" src={stockFood} />
        <div className="font-bold p-4 group-hover:underline">{title}</div>
      </div>
    );
  }