import { Recipe } from "src/types/object-types";
import stockFood from 'src/assets/mockFoodImage.jpg';
import { Link } from "react-router-dom";

export default function FoodDisplay({ recipe }: { recipe: Recipe }) {
    const { title, id } = recipe;
    return (
      <Link to={`/dish/${id}`} state={{ recipe }} className="flex gap-4 flex-col rounded-t-3xl shadow-xl w-60  group cursor-pointer">
        <img alt="stockfood" className="rounded-t-3xl" src={stockFood} />
        <div className="font-bold p-4 group-hover:underline">{title}</div>
      </Link>
    );
  }