import { useLocation } from 'react-router-dom';

/* Works, but not sure how to get the type of the dish. We pass the state from FoodDisplay */

export default function DishPage() {
  const { state: locationState } = useLocation();

  const { recipe } = locationState;
  const { id, title } = recipe;

  return <div>{recipe.title}</div>;
}
