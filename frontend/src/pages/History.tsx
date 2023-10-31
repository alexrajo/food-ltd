import React from 'react';
import FoodDisplay from 'src/components/home/FoodDisplay';
import { useAppSelector } from 'src/hooks/useAppRedux';
import useDish from 'src/hooks/useDish';

export default function History() {
  const dishes = useAppSelector((state) => state.history.value);

  return (
    <div className='flex w-full'>
      <p>Showing the last 10 viewd dishes</p>
      <div className='no-scrollbar flex w-full flex-col gap-2 overflow-y-scroll p-20'>
        {dishes !== undefined &&
          dishes !== null &&
          dishes.map((dish) => <FoodDisplay key={dish.dishId} dish={dish} />)}
      </div>
    </div>
  );
}
