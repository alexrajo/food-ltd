import type { Prisma } from '@prisma/client'

export const getDishesSearchQuery = (query: string) => {
  return query.split(' ').join(' & ')
}

export const getTitleSearchParams = (query: string) => {
  return {
    contains: `%${query}%`,
    mode: 'insensitive',
  }
}

export const getIngredientConstraints = (
  includedIngredients?: string[],
  excludedIngredients?: string[],
) => {
  includedIngredients = includedIngredients ?? []
  excludedIngredients = excludedIngredients ?? []

  const queryMode: Prisma.QueryMode = 'insensitive'

  const includedIngredientsConditions = includedIngredients.map(
    (ingredient) => ({
      ingredients: {
        contains: `%${ingredient}%`,
        mode: queryMode,
      },
    }),
  )

  const excludedIngredientsConditions = excludedIngredients.map(
    (ingredient) => ({
      ingredients: {
        not: {
          contains: `%${ingredient}%`,
        },
        mode: queryMode,
      },
    }),
  )

  return [...includedIngredientsConditions, ...excludedIngredientsConditions]
}
