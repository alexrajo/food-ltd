import { type Prisma } from '@prisma/client'
import {
  getIngredientConstraints,
  getTitleSearchParams,
} from '../../utils/dbSearch'
import { SORTING_OPTIONS } from '../../utils/constants'
import prisma from '../../utils/prisma'

type DishesRequestParams = {
  query: string
  page: number
  pageSize?: number
  includedIngredients?: string[]
  excludedIngredients?: string[]
  sortingPreference?: 'popular' | 'rating' | 'alphabetical'
}

const endpoint = async ({
  query,
  page,
  pageSize,
  sortingPreference,
  includedIngredients,
  excludedIngredients,
}: DishesRequestParams) => {
  pageSize = pageSize ?? 12
  page = page ?? 1

  const sortingOptions:
    | Prisma.DishWithReviewAggregateOrderByWithRelationAndSearchRelevanceInput
    | undefined =
    sortingPreference !== undefined
      ? (SORTING_OPTIONS[
          sortingPreference
        ] as Prisma.DishWithReviewAggregateOrderByWithRelationAndSearchRelevanceInput)
      : undefined

  const ingredientConstraints = getIngredientConstraints(
    includedIngredients,
    excludedIngredients,
  )

  if (query === '') {
    const data = await prisma.dishWithReviewAggregate.findMany({
      where: {
        AND: ingredientConstraints,
      },
      skip: Math.max(0, page - 1) * pageSize,
      take: pageSize,
      orderBy: sortingOptions,
    })
    const count = await prisma.dish.count({
      where: {
        AND: ingredientConstraints,
      },
    })
    const responseDishes = data.map((dish) => ({
      ...dish,
      reviewCount: Number(dish.reviewCount),
    }))
    return {
      pages: Math.ceil(count / pageSize),
      data: responseDishes,
    }
  } else {
    const data = await prisma.dishWithReviewAggregate.findMany({
      where: {
        title: getTitleSearchParams(
          query,
        ) as Prisma.StringNullableFilter<'DishWithReviewAggregate'>,
        AND: ingredientConstraints,
      },
      skip: Math.max(0, page - 1) * pageSize,
      take: pageSize,
      orderBy: sortingOptions,
    })
    const count = await prisma.dish.count({
      where: {
        title: getTitleSearchParams(
          query,
        ) as Prisma.StringNullableFilter<'Dish'>,
        AND: ingredientConstraints,
      },
    })
    const responseDishes = data.map((dish) => ({
      ...dish,
      reviewCount: Number(dish.reviewCount),
    }))
    return {
      pages: Math.ceil(count / pageSize),
      data: responseDishes,
    }
  }
}

export default endpoint
