import type { Prisma } from '@prisma/client'
import {
  getIngredientConstraints,
  getTitleSearchParams,
} from '../../utils/dbSearch'
import prisma from '../../utils/prisma'

type IngredientFilterCountsRequestParams = {
  query: string
  includedIngredients: string[]
  excludedIngredients: string[]
  ingredientOptions: string[]
}

const endpoint = async ({
  query,
  includedIngredients,
  excludedIngredients,
  ingredientOptions,
}: IngredientFilterCountsRequestParams) => {
  // Explicitly define the types of the variables to a dictionary where the key is a string and the value is a number
  const includedIngredientCounts: { [key: string]: number } = {}
  const excludedIngredientCounts: { [key: string]: number } = {}

  const ingredientConstraints = getIngredientConstraints(
    includedIngredients,
    excludedIngredients,
  )

  // Loop through all optional ingredients and count the resulting dishes when they are included or excluded
  if (query === '') {
    for (const [, ingredient] of ingredientOptions.entries()) {
      const includedCount = await prisma.dish.count({
        where: {
          AND: [
            ...ingredientConstraints,
            {
              ingredients: { contains: `%${ingredient}%`, mode: 'insensitive' },
            },
          ],
        },
      })
      const excludedCount = await prisma.dish.count({
        where: {
          AND: [
            ...ingredientConstraints,
            {
              ingredients: {
                not: { contains: `%${ingredient}%` },
                mode: 'insensitive',
              },
            },
          ],
        },
      })
      includedIngredientCounts[ingredient] = includedCount
      excludedIngredientCounts[ingredient] = excludedCount
    }
  } else {
    for (const [, ingredient] of ingredientOptions.entries()) {
      const includedCount = await prisma.dish.count({
        where: {
          title: getTitleSearchParams(
            query,
          ) as Prisma.StringNullableFilter<'Dish'>,
          AND: [
            ...ingredientConstraints,
            {
              ingredients: { contains: `%${ingredient}%`, mode: 'insensitive' },
            },
          ],
        },
      })
      const excludedCount = await prisma.dish.count({
        where: {
          title: getTitleSearchParams(
            query,
          ) as Prisma.StringNullableFilter<'Dish'>,
          AND: [
            ...ingredientConstraints,
            {
              ingredients: {
                not: { contains: `%${ingredient}%` },
                mode: 'insensitive',
              },
            },
          ],
        },
      })

      includedIngredientCounts[ingredient] = includedCount
      excludedIngredientCounts[ingredient] = excludedCount
    }
  }

  // Return the counts as stringified JSON objects, so that they can be parsed on the frontend
  return {
    data: {
      includedIngredients: JSON.stringify(includedIngredientCounts),
      excludedIngredients: JSON.stringify(excludedIngredientCounts),
    },
  }
}

export default endpoint
