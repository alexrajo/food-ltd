export const getDishesSearchQuery = (query: string) => {
  return query.split(' ').join(' & ');
};

export const getIngredientConstraints = (
  includedIngredients?: string[],
  excludedIngredients?: string[]
) => {
  includedIngredients = includedIngredients ?? [];
  excludedIngredients = excludedIngredients ?? [];

  const includedIngredientsConditions = includedIngredients.map(
    (ingredient) => ({
      ingredients: {
        contains: `%${ingredient}%`,
      },
    })
  );

  const excludedIngredientsConditions = excludedIngredients.map(
    (ingredient) => ({
      ingredients: {
        not: {
          contains: `%${ingredient}%`,
        },
      },
    })
  );

  return [...includedIngredientsConditions, ...excludedIngredientsConditions];
};
